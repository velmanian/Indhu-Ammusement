import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { AdminUserModel } from '../models/AdminUser';

export const ensureDefaultAdmin = async () => {
  const email = process.env.DEFAULT_ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123';

  // Do not attempt to seed if database is not connected
  if (mongoose.connection.readyState !== 1) {
    console.log('Skipping default admin user creation: Database is not connected');
    return;
  }

  try {
    const existing = await AdminUserModel.findOne({ email });
    if (existing) {
      console.log(`Admin user already exists with email: ${email}`);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await AdminUserModel.create({
      email,
      password: hashedPassword,
      name: 'Admin',
    });

    console.log('Default admin user created.');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
  } catch (error) {
    console.error('Failed to ensure default admin user:', error);
  }
};

