import { Router } from 'express';
import { getProducts, getProductBySlug } from '../controllers/product.controller';
import { getCategories } from '../controllers/category.controller';
import { submitEnquiry } from '../controllers/enquiry.controller';

const router = Router();

router.get('/products', getProducts);
router.get('/products/:slug', getProductBySlug);
router.get('/categories', getCategories);
router.post('/enquiry', submitEnquiry);

export default router;
