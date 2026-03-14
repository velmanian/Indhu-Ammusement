"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFallbackCategory = exports.addFallbackProduct = exports.saveFallbackData = exports.getFallbackData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const FALLBACK_FILE = path_1.default.join(__dirname, '..', 'db', 'fallbackData.json');
const getFallbackData = () => {
    try {
        if (fs_1.default.existsSync(FALLBACK_FILE)) {
            const content = fs_1.default.readFileSync(FALLBACK_FILE, 'utf-8');
            return JSON.parse(content);
        }
    }
    catch (error) {
        console.error('Error reading fallback file:', error);
    }
    return { categories: [], products: [] };
};
exports.getFallbackData = getFallbackData;
const saveFallbackData = (data) => {
    try {
        fs_1.default.writeFileSync(FALLBACK_FILE, JSON.stringify(data, null, 2));
    }
    catch (error) {
        console.error('Error writing fallback file:', error);
    }
};
exports.saveFallbackData = saveFallbackData;
const addFallbackProduct = (product) => {
    const data = (0, exports.getFallbackData)();
    data.products.push(product);
    (0, exports.saveFallbackData)(data);
};
exports.addFallbackProduct = addFallbackProduct;
const addFallbackCategory = (category) => {
    const data = (0, exports.getFallbackData)();
    data.categories.push(category);
    (0, exports.saveFallbackData)(data);
};
exports.addFallbackCategory = addFallbackCategory;
