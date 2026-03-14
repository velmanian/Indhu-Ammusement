"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.getCategories = void 0;
const Category_1 = require("../models/Category");
const fallbackDb_1 = require("../lib/fallbackDb");
const getCategories = async (req, res) => {
    try {
        const categories = await Category_1.CategoryModel.find();
        res.json(categories);
    }
    catch (error) {
        console.warn('Database is offline, returning fallback categories list');
        const fallback = (0, fallbackDb_1.getFallbackData)();
        res.json(fallback.categories);
    }
};
exports.getCategories = getCategories;
const createCategory = async (req, res) => {
    try {
        const { name, slug, description, image } = req.body;
        const category = new Category_1.CategoryModel({ name, slug, description, image });
        try {
            await category.save();
        }
        catch (error) {
            console.warn('Database is offline, persisting category to local fallback');
            const fakeId = 'offline_cat_' + Date.now();
            category._id = fakeId;
            category.id = fakeId;
            (0, fallbackDb_1.addFallbackCategory)({ ...req.body, _id: fakeId, id: fakeId });
        }
        res.status(201).json(category);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
};
exports.createCategory = createCategory;
