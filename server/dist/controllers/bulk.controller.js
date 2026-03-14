"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkUploadImages = exports.bulkUploadProducts = void 0;
const xlsx = __importStar(require("xlsx"));
const adm_zip_1 = __importDefault(require("adm-zip"));
const fallbackDb_1 = require("../lib/fallbackDb");
const cloudinary_1 = require("cloudinary");
const bulkUploadProducts = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No Excel file uploaded' });
        }
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);
        const fallback = (0, fallbackDb_1.getFallbackData)();
        const newProducts = [];
        // We will store the mapping of filename -> Cloudinary URL in a session or temp file? 
        // Actually, the user should upload ZIP FIRST, which returns a mapping.
        // For now, let's assume the excel contains the Cloudinary URL or we handle it.
        data.forEach((item, index) => {
            // User's specific columns: Product Name, Category, Description, Price, Image Name, Dimensions, Material, Age Group, Installation, Warranty, Status
            const name = item['Product Name'] || item.Name || item.name;
            if (!name)
                return;
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
            const processedImages = imageName ? (String(imageName)).split(',').map(img => img.trim()) : [];
            const product = {
                _id: 'bulk_' + Date.now() + index,
                id: 'bulk_' + Date.now() + index,
                name,
                slug,
                description: item.Description || item.description || '',
                price: item.Price || item.price,
                images: processedImages, // These should be Cloudinary URLs now
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
        (0, fallbackDb_1.saveFallbackData)(fallback);
        res.json({
            message: `Successfully imported ${newProducts.length} products.`,
            count: newProducts.length
        });
    }
    catch (error) {
        console.error('Bulk upload error:', error);
        res.status(500).json({ message: 'Error processing Excel file', error });
    }
};
exports.bulkUploadProducts = bulkUploadProducts;
const bulkUploadImages = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No ZIP file uploaded' });
        }
        const zip = new adm_zip_1.default(req.file.buffer);
        const zipEntries = zip.getEntries();
        const uploadPromises = [];
        const results = [];
        for (const entry of zipEntries) {
            if (!entry.isDirectory && /\.(jpg|jpeg|png|webp|gif)$/i.test(entry.entryName)) {
                const promise = new Promise((resolve, reject) => {
                    const uploadStream = cloudinary_1.v2.uploader.upload_stream({ folder: 'bulk_uploads' }, (error, result) => {
                        if (error)
                            reject(error);
                        else {
                            results.push({
                                originalName: entry.name,
                                url: result?.secure_url || ''
                            });
                            resolve(result);
                        }
                    });
                    uploadStream.end(entry.getData());
                });
                uploadPromises.push(promise);
            }
        }
        await Promise.all(uploadPromises);
        res.json({
            message: `Successfully uploaded ${results.length} images to Cloudinary`,
            mapping: results
        });
    }
    catch (error) {
        console.error('Bulk image upload error:', error);
        res.status(500).json({ message: 'Error processing ZIP file', error });
    }
};
exports.bulkUploadImages = bulkUploadImages;
