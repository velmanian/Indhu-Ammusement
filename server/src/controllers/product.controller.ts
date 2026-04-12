import { Request, Response } from 'express';
import { ProductModel } from '../models/Product';
import { CategoryModel } from '../models/Category';
import { getFallbackData, addFallbackProduct, updateFallbackProduct, deleteFallbackProduct } from '../lib/fallbackDb';

import { getIsConnected } from '../lib/database';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    if (!getIsConnected()) {
      console.warn('Database is offline (cached state), returning fallback products list');
      return returnFallbackProducts(req, res, category as string);
    }

    // Build query object
    let query: any = {};
    if (category) {
      const categoryDoc = await CategoryModel.findOne({ slug: category as string });
      if (categoryDoc) {
        query.categoryId = categoryDoc._id;
      }
    }
    try {
      const products = await ProductModel.find(query).populate('category', 'name slug description image');
      res.json(products);
    } catch (dbError) {
      console.warn('Database error during getProducts, returning fallback');
      returnFallbackProducts(req, res, category as string);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

const returnFallbackProducts = (req: Request, res: Response, category?: string) => {
  const fallback = getFallbackData();
  let products = fallback.products;

  if (category) {
    products = products.filter(p => p.category?.slug === category || p.categoryId === category);
  }

  return res.json(products);
};

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;

    if (!getIsConnected()) {
      console.warn('Database is offline (cached state), searching fallback for slug:', slug);
      return returnFallbackProductBySlug(res, slug);
    }
    try {
      const product = await ProductModel.findOne({ slug: slug as string }).populate('category', 'name slug description image');
      if (!product) {
        // If not in DB, maybe it's in our fallback?
        const fallback = getFallbackData();
        const fProduct = fallback.products.find(p => p.slug === slug);
        if (fProduct) return res.json(fProduct);
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (dbError) {
      returnFallbackProductBySlug(res, slug);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

const returnFallbackProductBySlug = (res: Response, slug: string) => {
  const fallback = getFallbackData();
  const product = fallback.products.find(p => p.slug === slug);
  if (!product) return res.status(404).json({ message: 'Product not found in fallback' });
  return res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, slug, description, specifications, images, categoryId } = req.body;
    const product = new ProductModel({ name, slug, description, specifications, images, categoryId });

    if (!getIsConnected()) {
      console.warn('Database is offline (cached state), persisting product to local fallback');
      return persistToFallback(req, res, product, categoryId);
    }

    try {
      await product.save();
    } catch (dbError) {
      return persistToFallback(req, res, product, categoryId);
    }

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

const persistToFallback = (req: Request, res: Response, product: any, categoryId: string) => {
  // Assign a fake ID so the frontend doesn't crash
  const fakeId = 'offline_' + Date.now();
  (product as any)._id = fakeId;
  (product as any).id = fakeId;

  // Try to find category info for the fallback
  const fallback = getFallbackData();
  const category = fallback.categories.find(c => c._id === categoryId || c.id === categoryId);

  addFallbackProduct({
    ...req.body,
    _id: fakeId,
    id: fakeId,
    category: category || { name: 'Other', slug: 'other' }
  });
  return res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = req.body;

    // Handle offline IDs or database disconnection
    if (id.startsWith('offline_') || !getIsConnected()) {
      console.warn('Updating product in local fallback (ID or Offline):', id);
      const product = updateFallbackProduct(id, data);
      if (!product) return res.status(404).json({ message: 'Fallback product not found' });
      return res.json(product);
    }

    try {
      const product = await ProductModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (dbError: any) {
      console.error('Database error during updateProduct:', dbError);

      if (dbError.name === 'ValidationError') {
        return res.status(400).json({ message: 'Validation failed', error: dbError.message });
      }

      if (dbError.code === 11000) {
        return res.status(400).json({ message: 'A product with this URL slug already exists.' });
      }

      console.warn('Database might be offline, attempting to update local fallback for ID:', id);
      const product = updateFallbackProduct(id, data);
      if (product) {
        return res.json(product);
      }

      res.status(500).json({
        message: 'Error updating product',
        error: dbError.message || dbError
      });
    }
  } catch (error: any) {
    console.error('General error in updateProduct:', error);
    res.status(500).json({ message: 'Error updating product', error: error.message || error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    if (id.startsWith('offline_') || !getIsConnected()) {
      console.warn('Deleting product from local fallback (ID or Offline):', id);
      const success = deleteFallbackProduct(id);
      if (!success) return res.status(404).json({ message: 'Fallback product not found' });
      return res.json({ message: 'Product deleted from fallback' });
    }

    try {
      const product = await ProductModel.findByIdAndDelete(id);
      if (!product) {
        // Try fallback just in case
        const success = deleteFallbackProduct(id);
        if (success) return res.json({ message: 'Product deleted from fallback' });
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json({ message: 'Product deleted' });
    } catch (dbError: any) {
      console.error('Database error during deleteProduct:', dbError);
      const success = deleteFallbackProduct(id);
      if (success) {
        return res.json({ message: 'Product deleted from fallback' });
      }
      res.status(500).json({ message: 'Error deleting product', error: dbError.message || dbError });
    }
  } catch (error: any) {
    console.error('General error in deleteProduct:', error);
    res.status(500).json({ message: 'Error deleting product', error: error.message || error });
  }
};
