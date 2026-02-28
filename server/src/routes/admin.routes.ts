import { Router } from 'express';
import { createProduct, updateProduct, deleteProduct, getProducts as adminGetProducts } from '../controllers/product.controller';
import { createCategory, getCategories } from '../controllers/category.controller';
import { getEnquiries, updateEnquiryStatus, getEnquiryById } from '../controllers/enquiry.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticateToken);

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
