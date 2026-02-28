export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  specifications?: any;
  images?: any;
  category?: Category;
  categoryId?: number;
}

export interface Enquiry {
  id: number;
  name: string;
  phone: string;
  email: string;
  location: string;
  message: string;
  product?: Product;
  productId?: number;
  selectedProducts?: any[];
  usagePurpose?: string[];
  status: string;
  createdAt: string;
}
