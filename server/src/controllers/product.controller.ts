import { Request, Response } from 'express';
import { ProductModel } from '../models/Product';
import { CategoryModel } from '../models/Category';
import { getFallbackData, addFallbackProduct } from '../lib/fallbackDb';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    // Build query object
    let query: any = {};
    if (category) {
      const categoryDoc = await CategoryModel.findOne({ slug: category as string });
      if (categoryDoc) {
        query.categoryId = categoryDoc._id;
      }
    }
    try {
      const products = await ProductModel.find(query).populate('categoryId', 'name slug description image');
      res.json(products);
    } catch (dbError) {
      console.warn('Database is offline, returning fallback products list');
      const fallback = getFallbackData();
      let products = fallback.products;

      if (category) {
        products = products.filter(p => p.category?.slug === category || p.categoryId === category);
      }

      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    try {
      const product = await ProductModel.findOne({ slug: slug as string }).populate('categoryId', 'name slug description image');
      if (!product) {
        // If not in DB, maybe it's in our fallback?
        const fallback = getFallbackData();
        const fProduct = fallback.products.find(p => p.slug === slug);
        if (fProduct) return res.json(fProduct);
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (dbError) {
      console.warn('Database is offline, searching fallback for slug:', slug);
      const fallback = getFallbackData();
      const product = fallback.products.find(p => p.slug === slug);
      if (!product) return res.status(404).json({ message: 'Product not found in fallback' });
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, slug, description, specifications, images, categoryId } = req.body;
    const product = new ProductModel({ name, slug, description, specifications, images, categoryId });

    try {
      await product.save();
    } catch (dbError) {
      console.warn('Database is offline, persisting product to local fallback');
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
    }

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const product = await ProductModel.findByIdAndUpdate(id, data, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};
