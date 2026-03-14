"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductBySlug = exports.getProducts = void 0;
const Product_1 = require("../models/Product");
const Category_1 = require("../models/Category");
const fallbackDb_1 = require("../lib/fallbackDb");
const getProducts = async (req, res) => {
    try {
        const { category } = req.query;
        // Build query object
        let query = {};
        if (category) {
            const categoryDoc = await Category_1.CategoryModel.findOne({ slug: category });
            if (categoryDoc) {
                query.categoryId = categoryDoc._id;
            }
        }
        try {
            const products = await Product_1.ProductModel.find(query).populate('categoryId', 'name slug description image');
            res.json(products);
        }
        catch (dbError) {
            console.warn('Database is offline, returning fallback products list');
            const fallback = (0, fallbackDb_1.getFallbackData)();
            let products = fallback.products;
            if (category) {
                products = products.filter(p => p.category?.slug === category || p.categoryId === category);
            }
            res.json(products);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};
exports.getProducts = getProducts;
const getProductBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        try {
            const product = await Product_1.ProductModel.findOne({ slug: slug }).populate('categoryId', 'name slug description image');
            if (!product) {
                // If not in DB, maybe it's in our fallback?
                const fallback = (0, fallbackDb_1.getFallbackData)();
                const fProduct = fallback.products.find(p => p.slug === slug);
                if (fProduct)
                    return res.json(fProduct);
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(product);
        }
        catch (dbError) {
            console.warn('Database is offline, searching fallback for slug:', slug);
            const fallback = (0, fallbackDb_1.getFallbackData)();
            const product = fallback.products.find(p => p.slug === slug);
            if (!product)
                return res.status(404).json({ message: 'Product not found in fallback' });
            res.json(product);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};
exports.getProductBySlug = getProductBySlug;
const createProduct = async (req, res) => {
    try {
        const { name, slug, description, specifications, images, categoryId } = req.body;
        const product = new Product_1.ProductModel({ name, slug, description, specifications, images, categoryId });
        try {
            await product.save();
        }
        catch (dbError) {
            console.warn('Database is offline, persisting product to local fallback');
            // Assign a fake ID so the frontend doesn't crash
            const fakeId = 'offline_' + Date.now();
            product._id = fakeId;
            product.id = fakeId;
            // Try to find category info for the fallback
            const fallback = (0, fallbackDb_1.getFallbackData)();
            const category = fallback.categories.find(c => c._id === categoryId || c.id === categoryId);
            (0, fallbackDb_1.addFallbackProduct)({
                ...req.body,
                _id: fakeId,
                id: fakeId,
                category: category || { name: 'Other', slug: 'other' }
            });
        }
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const product = await Product_1.ProductModel.findByIdAndUpdate(id, data, { new: true });
        if (!product)
            return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product_1.ProductModel.findByIdAndDelete(id);
        if (!product)
            return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};
exports.deleteProduct = deleteProduct;
