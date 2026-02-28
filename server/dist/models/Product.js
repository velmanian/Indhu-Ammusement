"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
    },
    specifications: {
        type: mongoose_1.default.Schema.Types.Mixed,
        required: false,
    },
    images: [{
            type: String,
            required: false,
        }],
    categoryId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Category',
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.ProductModel = mongoose_1.default.model('Product', productSchema);
