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
        const dir = path.dirname(FALLBACK_FILE);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
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

export const updateFallbackCategory = (id: string, categoryData: any) => {
    const data = getFallbackData();
    const index = data.categories.findIndex(c => c._id === id || c.id === id);
    if (index !== -1) {
        data.categories[index] = { ...data.categories[index], ...categoryData };
        saveFallbackData(data);
        return data.categories[index];
    }
    return null;
};

export const deleteFallbackCategory = (id: string) => {
    const data = getFallbackData();
    const index = data.categories.findIndex(c => c._id === id || c.id === id);
    if (index !== -1) {
        data.categories.splice(index, 1);
        saveFallbackData(data);
        return true;
    }
    return false;
};

export const updateFallbackProduct = (id: string, productData: any) => {
    const data = getFallbackData();
    const index = data.products.findIndex(p => p._id === id || p.id === id);
    if (index !== -1) {
        data.products[index] = { ...data.products[index], ...productData };
        saveFallbackData(data);
        return data.products[index];
    }
    return null;
};

export const deleteFallbackProduct = (id: string) => {
    const data = getFallbackData();
    const index = data.products.findIndex(p => p._id === id || p.id === id);
    if (index !== -1) {
        data.products.splice(index, 1);
        saveFallbackData(data);
        return true;
    }
    return false;
};
