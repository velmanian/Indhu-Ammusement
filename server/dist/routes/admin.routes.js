"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const product_controller_1 = require("../controllers/product.controller");
const category_controller_1 = require("../controllers/category.controller");
const enquiry_controller_1 = require("../controllers/enquiry.controller");
const bulk_controller_1 = require("../controllers/bulk.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const cloudinary_1 = require("../config/cloudinary");
const router = (0, express_1.Router)();
// Storage config switched to Cloudinary
const upload = (0, multer_1.default)({
    storage: cloudinary_1.storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per file
    fileFilter: (_req, file, cb) => {
        if (file.mimetype.startsWith('image/'))
            cb(null, true);
        else
            cb(new Error('Only image files are allowed'));
    },
});
const memoryUpload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
router.use(auth_middleware_1.authenticateToken);
// Image upload endpoint
router.post('/upload', upload.array('images', 10), (req, res) => {
    const files = req.files;
    if (!files || files.length === 0) {
        res.status(400).json({ message: 'No files uploaded' });
        return;
    }
    // Cloudinary storage returns 'path' as the URL
    const urls = files.map(f => f.path);
    res.json({ urls });
});
router.get('/products', product_controller_1.getProducts);
router.post('/products', product_controller_1.createProduct);
router.put('/products/:id', product_controller_1.updateProduct);
router.delete('/products/:id', product_controller_1.deleteProduct);
router.get('/categories', category_controller_1.getCategories);
router.post('/categories', category_controller_1.createCategory);
router.get('/enquiries', enquiry_controller_1.getEnquiries);
router.get('/enquiries/:id', enquiry_controller_1.getEnquiryById);
router.put('/enquiries/:id', enquiry_controller_1.updateEnquiryStatus);
// Bulk Uploads
router.post('/bulk-products', memoryUpload.single('file'), bulk_controller_1.bulkUploadProducts);
router.post('/bulk-images', memoryUpload.single('file'), bulk_controller_1.bulkUploadImages);
exports.default = router;
