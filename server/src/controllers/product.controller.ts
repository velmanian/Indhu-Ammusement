import { Request, Response } from 'express';
import { ProductModel } from '../models/Product';
import { CategoryModel } from '../models/Category';

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
    
    const products = await ProductModel.find(query).populate('categoryId', 'name slug description image');
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

export const getProductBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const product = await ProductModel.findOne({ slug: slug as string }).populate('categoryId', 'name slug description image');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, slug, description, specifications, images, categoryId } = req.body;
    const product = new ProductModel({ name, slug, description, specifications, images, categoryId });
    await product.save();
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
