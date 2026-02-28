import mongoose from 'mongoose';
import { IProduct } from './Product';

export interface IEnquiry extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  phone: string;
  email: string;
  location: string;
  message: string;
  product?: mongoose.Types.ObjectId | IProduct;
  productId?: mongoose.Types.ObjectId;
  selectedProducts?: any[]; // Store array of selected products
  usagePurpose?: string[]; // Store usage purpose selections
  status: 'PENDING' | 'RESPONDED' | 'CLOSED';
  createdAt: Date;
}

const enquirySchema = new mongoose.Schema<IEnquiry>({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: false,
  },
  selectedProducts: {
    type: [{
      id: Number,
      name: String,
      slug: String,
      image: String,
      description: String,
      price: String,
      categoryId: Number,
      category: {
        id: Number,
        name: String,
        slug: String
      }
    }],
    required: false,
  },
  usagePurpose: {
    type: [String],
    required: false,
  },
  status: {
    type: String,
    enum: ['PENDING', 'RESPONDED', 'CLOSED'],
    default: 'PENDING',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const EnquiryModel = mongoose.model<IEnquiry>('Enquiry', enquirySchema);