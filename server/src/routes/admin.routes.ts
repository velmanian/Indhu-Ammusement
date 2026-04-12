import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { createProduct, updateProduct, deleteProduct, getProducts as adminGetProducts } from '../controllers/product.controller';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../controllers/category.controller';
import { getEnquiries, updateEnquiryStatus, getEnquiryById, deleteEnquiry } from '../controllers/enquiry.controller';
import { bulkUploadProducts, bulkUploadImages } from '../controllers/bulk.controller';
import { authenticateToken } from '../middleware/auth.middleware';

import { storage as cloudinaryStorage } from '../config/cloudinary';

const router = Router();

// Storage config switched to Cloudinary
const upload = multer({
    storage: cloudinaryStorage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per file
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Only image files are allowed'));
    },
});

const memoryUpload = multer({ storage: multer.memoryStorage() });

router.use(authenticateToken);

// Image upload endpoint
router.post('/upload', upload.array('images', 10), (req: Request, res: Response) => {
    const files = req.files as any[];
    if (!files || files.length === 0) {
        res.status(400).json({ message: 'No files uploaded' });
        return;
    }
    // Cloudinary storage returns 'path' as the URL
    const urls = files.map(f => f.path);
    res.json({ urls });
});

router.get('/products', adminGetProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

router.get('/categories', getCategories);
router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

router.get('/enquiries', getEnquiries);
router.get('/enquiries/:id', getEnquiryById);
router.put('/enquiries/:id', updateEnquiryStatus);
router.delete('/enquiries/:id', deleteEnquiry);

// Bulk Uploads
router.post('/bulk-products', memoryUpload.single('file'), bulkUploadProducts);
router.post('/bulk-images', memoryUpload.single('file'), bulkUploadImages);

export default router;
