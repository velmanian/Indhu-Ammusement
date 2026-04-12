import { Request, Response } from 'express';
import * as xlsx from 'xlsx';
import AdmZip from 'adm-zip';
import { getFallbackData, saveFallbackData } from '../lib/fallbackDb';
import { v2 as cloudinary } from 'cloudinary';
import { ProductModel } from '../models/Product';
import { CategoryModel } from '../models/Category';
import { getIsConnected } from '../lib/database';

// Temporary in-memory store for ZIP mapping (resets on server restart)
let imageMapping: { [key: string]: string } = {};

export const bulkUploadProducts = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No Excel file uploaded' });
        }

        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data: any[] = xlsx.utils.sheet_to_json(worksheet);

        const newProducts: any[] = [];
        const fallback = getFallbackData();

        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const name = item['Product Name'] || item.Name || item.name;
            if (!name) continue;

            const categoryName = item.Category || item.category || 'Other';

            // 1. Handle Category (Unified Check)
            let categoryId: any = null;
            let categoryInfo: any = null;

            if (getIsConnected()) {
                try {
                    let dbCategory = await CategoryModel.findOne({
                        $or: [{ name: categoryName }, { slug: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-') }]
                    });

                    if (!dbCategory) {
                        dbCategory = await CategoryModel.create({
                            name: categoryName,
                            slug: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                        });
                    }
                    categoryId = dbCategory._id;
                    categoryInfo = { _id: dbCategory._id, id: dbCategory._id, name: dbCategory.name, slug: dbCategory.slug };
                } catch (err) {
                    console.error('DB error in bulk category handling:', err);
                }
            }

            // Fallback check if DB fail or offline
            if (!categoryId) {
                let fCat = fallback.categories.find(c =>
                    c.name.toLowerCase() === categoryName.toLowerCase() ||
                    c.slug === categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                );

                if (!fCat) {
                    fCat = {
                        _id: 'offline_cat_' + Date.now() + i,
                        id: 'offline_cat_' + Date.now() + i,
                        name: categoryName,
                        slug: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                    };
                    fallback.categories.push(fCat);
                }
                categoryId = fCat._id;
                categoryInfo = fCat;
            }

            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            // 2. Handle Images (Link from mapping or use directly)
            const imageNameHeader = item['Image Name'] || item.images || item.Images;
            const imagesList = imageNameHeader ? (String(imageNameHeader)).split(',').map(img => img.trim()) : [];

            const processedImages = imagesList.map(img => {
                // If it's already a URL, use it
                if (img.startsWith('http')) return img;
                // Otherwise check if we have it in our recent ZIP upload mapping
                return imageMapping[img] || img;
            });

            const productData = {
                name,
                slug,
                description: item.Description || item.description || '',
                images: processedImages,
                categoryId: categoryId,
                specifications: {
                    dimensions: item.Dimensions || item.dimensions || '',
                    material: item.Material || item.material || '',
                    ageGroup: item['Age Group'] || item.age_group || item.ageGroup || '',
                    installation: item.Installation || item.installation || '',
                    warranty: item.Warranty || item.warranty || '',
                    status: item.Status || item.status || 'Active',
                }
            };

            // 3. Save to DB or Fallback
            let savedToDb = false;
            if (getIsConnected()) {
                try {
                    // Use upsert by slug
                    await ProductModel.findOneAndUpdate({ slug }, productData, { upsert: true, new: true });
                    newProducts.push({ ...productData, category: categoryInfo });
                    savedToDb = true;
                } catch (err) {
                    console.error('DB error in bulk product save:', err);
                }
            }

            if (!savedToDb) {
                console.warn('Persisting bulk product to local fallback:', name);
                const fallbackProduct = {
                    ...productData,
                    _id: 'bulk_' + Date.now() + i,
                    id: 'bulk_' + Date.now() + i,
                    category: categoryInfo,
                    createdAt: new Date().toISOString()
                };
                fallback.products.push(fallbackProduct);
                newProducts.push(fallbackProduct);
            }
        }

        saveFallbackData(fallback);

        res.json({
            message: `Successfully processed ${newProducts.length} products.`,
            count: newProducts.length
        });
    } catch (error) {
        console.error('Bulk upload error:', error);
        res.status(500).json({ message: 'Error processing Excel file', error });
    }
};

export const bulkUploadImages = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No ZIP file uploaded' });
        }

        const zip = new AdmZip(req.file.buffer);
        const zipEntries = zip.getEntries();
        const results: { originalName: string, url: string }[] = [];

        // Clear old mapping or keep it? User might upload multiple zips. Let's merge.

        const uploadPromises = zipEntries
            .filter(entry => !entry.isDirectory && /\.(jpg|jpeg|png|webp|gif)$/i.test(entry.entryName))
            .map(entry => {
                return new Promise((resolve) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        { folder: 'bulk_uploads' },
                        (error, result) => {
                            if (error) {
                                console.error('Cloudinary upload error for', entry.name, error);
                                resolve(null);
                            } else {
                                const url = result?.secure_url || '';
                                imageMapping[entry.name] = url;
                                results.push({ originalName: entry.name, url });
                                resolve(result);
                            }
                        }
                    );
                    uploadStream.end(entry.getData());
                });
            });

        await Promise.all(uploadPromises);

        res.json({
            message: `Successfully uploaded ${results.length} images to Cloudinary`,
            count: results.length,
            mapping: results
        });
    } catch (error) {
        console.error('Bulk image upload error:', error);
        res.status(500).json({ message: 'Error processing ZIP file', error });
    }
};
