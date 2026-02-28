import mongoose from 'mongoose';

export interface ICategory extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  createdAt: Date;
}

const categorySchema = new mongoose.Schema<ICategory>({
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
  image: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const CategoryModel = mongoose.model<ICategory>('Category', categorySchema);