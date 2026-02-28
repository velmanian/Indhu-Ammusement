import mongoose from 'mongoose';
import { ICategory } from './Category';

export interface IProduct extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  specifications?: any;
  images?: string[];
  category?: mongoose.Types.ObjectId | ICategory;
  categoryId?: mongoose.Types.ObjectId;
  enquiries: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const productSchema = new mongoose.Schema<IProduct>({
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
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
  images: [{
    type: String,
    required: false,
  }],
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ProductModel = mongoose.model<IProduct>('Product', productSchema);