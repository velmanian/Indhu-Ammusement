import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { createProduct, updateProduct, deleteProduct, getProducts as adminGetProducts } from '../controllers/product.controller';
import { createCategory, getCategories } from '../controllers/category.controller';
import { getEnquiries, updateEnquiryStatus, getEnquiryById } from '../controllers/enquiry.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// Multer storage config — save to /uploads with original extension
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e6);
        cb(null, unique + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per file
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith('image/')) cb(null, true);
        else cb(new Error('Only image files are allowed'));
    },
});

router.use(authenticateToken);

// Image upload endpoint
router.post('/upload', upload.array('images', 10), (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
        res.status(400).json({ message: 'No files uploaded' });
        return;
    }
    const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
    const urls = files.map(f => `${baseUrl}/uploads/${f.filename}`);
    res.json({ urls });
});

router.get('/products', adminGetProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

router.get('/categories', getCategories);
router.post('/categories', createCategory);

router.get('/enquiries', getEnquiries);
router.get('/enquiries/:id', getEnquiryById);
router.put('/enquiries/:id', updateEnquiryStatus);

export default router;
