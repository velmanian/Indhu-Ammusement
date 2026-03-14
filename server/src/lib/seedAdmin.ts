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
    const defaultAdmins = [
      { email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@example.com', password: process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123', name: 'Admin' },
      { email: 'mani@gmail.com', password: '123', name: 'Mani' }
    ];

    for (const admin of defaultAdmins) {
      const existing = await AdminUserModel.findOne({ email: admin.email });
      if (existing) {
        console.log(`Admin user already exists with email: ${admin.email}`);
        continue;
      }

      const hashedPassword = await bcrypt.hash(admin.password, 10);
      await AdminUserModel.create({
        email: admin.email,
        password: hashedPassword,
        name: admin.name,
      });

      console.log(`Admin user created: ${admin.email}`);
    }
  } catch (error) {
    console.error('Failed to ensure default admin users:', error);
  }
};

