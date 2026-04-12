import { Request, Response } from 'express';
import { CategoryModel } from '../models/Category';
import { getFallbackData, addFallbackCategory, updateFallbackCategory, deleteFallbackCategory } from '../lib/fallbackDb';
import { getIsConnected } from '../lib/database';

export const getCategories = async (req: Request, res: Response) => {
  try {
    if (!getIsConnected()) {
      console.warn('Database is offline (cached state), returning fallback categories list');
      const fallback = getFallbackData();
      return res.json(fallback.categories);
    }

    try {
      const categories = await CategoryModel.find();
      res.json(categories);
    } catch (dbError) {
      console.warn('Database error during getCategories, returning fallback');
      const fallback = getFallbackData();
      res.json(fallback.categories);
    }
  } catch (error: any) {
    console.error('Error in getCategories:', error);
    res.status(500).json({ message: 'Error fetching categories', error: error.message || error });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug, description, image } = req.body;
    const category = new CategoryModel({ name, slug, description, image });

    if (!getIsConnected()) {
      console.warn('Database is offline (cached state), persisting category to local fallback');
      return persistCategoryToFallback(res, category, req.body);
    }

    try {
      await category.save();
    } catch (dbError) {
      return persistCategoryToFallback(res, category, req.body);
    }
    res.status(201).json(category);
  } catch (error: any) {
    console.error('Error in createCategory:', error);
    res.status(500).json({ message: 'Error creating category', error: error.message || error });
  }
};

const persistCategoryToFallback = (res: Response, category: any, data: any) => {
  const fakeId = 'offline_cat_' + Date.now();
  (category as any)._id = fakeId;
  (category as any).id = fakeId;
  addFallbackCategory({ ...data, _id: fakeId, id: fakeId });
  return res.status(201).json(category);
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data = req.body;

    if (id.startsWith('offline_cat_') || !getIsConnected()) {
        const category = updateFallbackCategory(id, data);
        if (!category) return res.status(404).json({ message: 'Fallback category not found' });
        return res.json(category);
    }

    try {
        const category = await CategoryModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json(category);
    } catch (dbError: any) {
        console.error('Database error in updateCategory:', dbError);
        const category = updateFallbackCategory(id, data);
        if (category) return res.json(category);
        res.status(500).json({ message: 'Error updating category', error: dbError.message || dbError });
    }
  } catch (error: any) {
    console.error('Error in updateCategory:', error);
    res.status(500).json({ message: 'Error updating category', error: error.message || error });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
  
      if (id.startsWith('offline_cat_') || !getIsConnected()) {
        const success = deleteFallbackCategory(id);
        if (!success) return res.status(404).json({ message: 'Fallback category not found' });
        return res.json({ message: 'Category deleted from fallback' });
      }
  
      try {
        const category = await CategoryModel.findByIdAndDelete(id);
        if (!category) {
          const success = deleteFallbackCategory(id);
          if (success) return res.json({ message: 'Category deleted from fallback' });
          return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted' });
      } catch (dbError: any) {
        console.error('Database error in deleteCategory:', dbError);
        const success = deleteFallbackCategory(id);
        if (success) return res.json({ message: 'Category deleted from fallback' });
        res.status(500).json({ message: 'Error deleting category', error: dbError.message || dbError });
      }
    } catch (error: any) {
      console.error('Error in deleteCategory:', error);
      res.status(500).json({ message: 'Error deleting category', error: error.message || error });
    }
};
