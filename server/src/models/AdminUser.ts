import mongoose from 'mongoose';

export interface IAdminUser extends mongoose.Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  name?: string;
  createdAt: Date;
}

const adminUserSchema = new mongoose.Schema<IAdminUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const AdminUserModel = mongoose.model<IAdminUser>('AdminUser', adminUserSchema);