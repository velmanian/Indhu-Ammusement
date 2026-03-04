import { Request, Response } from 'express';
import { CategoryModel } from '../models/Category';
import { getFallbackData, addFallbackCategory } from '../lib/fallbackDb';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find();
    res.json(categories);
  } catch (error) {
    console.warn('Database is offline, returning fallback categories list');
    const fallback = getFallbackData();
    res.json(fallback.categories);
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, slug, description, image } = req.body;

    const category = new CategoryModel({ name, slug, description, image });
    try {
      await category.save();
    } catch (error) {
      console.warn('Database is offline, persisting category to local fallback');
      const fakeId = 'offline_cat_' + Date.now();
      (category as any)._id = fakeId;
      (category as any).id = fakeId;
      addFallbackCategory({ ...req.body, _id: fakeId, id: fakeId });
    }
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }
};
