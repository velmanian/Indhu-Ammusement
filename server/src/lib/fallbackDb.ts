import fs from 'fs';
import path from 'path';

const FALLBACK_FILE = path.join(__dirname, '..', 'db', 'fallbackData.json');

export interface FallbackData {
    categories: any[];
    products: any[];
}

export const getFallbackData = (): FallbackData => {
    try {
        if (fs.existsSync(FALLBACK_FILE)) {
            const content = fs.readFileSync(FALLBACK_FILE, 'utf-8');
            return JSON.parse(content);
        }
    } catch (error) {
        console.error('Error reading fallback file:', error);
    }
    return { categories: [], products: [] };
};

export const saveFallbackData = (data: FallbackData) => {
    try {
        fs.writeFileSync(FALLBACK_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing fallback file:', error);
    }
};

export const addFallbackProduct = (product: any) => {
    const data = getFallbackData();
    data.products.push(product);
    saveFallbackData(data);
};

export const addFallbackCategory = (category: any) => {
    const data = getFallbackData();
    data.categories.push(category);
    saveFallbackData(data);
};
