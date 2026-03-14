export interface Category {
  id: string | number;
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface Product {
  id: string | number;
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  specifications?: any;
  images?: string[];
  category?: Category;
  categoryId?: string | number;
}

export interface Enquiry {
  id: string | number;
  _id?: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  message: string;
  product?: Product;
  productId?: string | number;
  selectedProducts?: any[];
  usagePurpose?: string[];
  status: string;
  createdAt: string;
}
