"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.getCategories = void 0;
const Category_1 = require("../models/Category");
const getCategories = async (req, res) => {
    try {
        const categories = await Category_1.CategoryModel.find();
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};
exports.getCategories = getCategories;
const createCategory = async (req, res) => {
    try {
        const { name, slug, description, image } = req.body;
        const category = new Category_1.CategoryModel({ name, slug, description, image });
        await category.save();
        res.status(201).json(category);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
};
exports.createCategory = createCategory;
