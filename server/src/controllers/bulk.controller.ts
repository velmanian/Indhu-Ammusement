import { Request, Response } from 'express';
import * as xlsx from 'xlsx';
import AdmZip from 'adm-zip';
import path from 'path';
import fs from 'fs';
import { getFallbackData, saveFallbackData } from '../lib/fallbackDb';

export const bulkUploadProducts = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No Excel file uploaded' });
        }

        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data: any[] = xlsx.utils.sheet_to_json(worksheet);

        const fallback = getFallbackData();
        const newProducts: any[] = [];
        const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;

        data.forEach((item, index) => {
            // User's specific columns: Product Name, Category, Description, Price, Image Name, Dimensions, Material, Age Group, Installation, Warranty, Status
            const name = item['Product Name'] || item.Name || item.name;
            if (!name) return;

            const categoryName = item.Category || item.category;
            let category = fallback.categories.find(c => c.name === categoryName);

            if (!category && categoryName) {
                category = {
                    _id: 'offline_cat_' + Date.now() + index,
                    id: 'offline_cat_' + Date.now() + index,
                    name: categoryName,
                    slug: categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                };
                fallback.categories.push(category);
            }

            const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            // Image handling (match from ZIP previously uploaded)
            const imageName = item['Image Name'] || item.images || item.Images;
            const processedImages = imageName ? (String(imageName)).split(',').map(img => {
                const trimmed = img.trim();
                if (trimmed.startsWith('http')) return trimmed;
                return `${baseUrl}/uploads/${trimmed}`;
            }) : [];

            const product = {
                _id: 'bulk_' + Date.now() + index,
                id: 'bulk_' + Date.now() + index,
                name,
                slug,
                description: item.Description || item.description || '',
                price: item.Price || item.price,
                images: processedImages,
                categoryId: category?._id || '',
                category: category || { name: 'Other', slug: 'other' },
                specifications: {
                    dimensions: item.Dimensions || item.dimensions,
                    material: item.Material || item.material,
                    ageGroup: item['Age Group'] || item.age_group,
                    installation: item.Installation || item.installation,
                    warranty: item.Warranty || item.warranty,
                    status: item.Status || item.status || 'Active',
                    price: item.Price || item.price // Store price in specs too for safety
                },
                createdAt: new Date().toISOString()
            };

            newProducts.push(product);
            fallback.products.push(product);
        });

        saveFallbackData(fallback);

        res.json({
            message: `Successfully imported ${newProducts.length} products. Existing products preserved.`,
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
        const uploadsDir = path.join(__dirname, '..', '..', 'uploads');

        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        zip.extractAllTo(uploadsDir, true);

        const entries = zip.getEntries();
        const filenames = entries.filter(e => !e.isDirectory).map(e => e.entryName);

        res.json({
            message: `Successfully extracted ${filenames.length} files`,
            files: filenames
        });
    } catch (error) {
        console.error('ZIP upload error:', error);
        res.status(500).json({ message: 'Error processing ZIP file', error });
    }
};
