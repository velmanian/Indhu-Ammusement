import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { AdminUserModel } from './src/models/AdminUser';

dotenv.config();

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.DATABASE_URL!);
    console.log('Connected to MongoDB');

    // Check if admin user already exists
    const existingAdmin = await AdminUserModel.findOne({ email: 'admin@indhu.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      mongoose.connection.close();
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 10); // Default password

    // Create new admin user
    const adminUser = new AdminUserModel({
      email: 'admin@indhu.com',
      password: hashedPassword,
      name: 'Indhu Admin'
    });

    await adminUser.save();
    console.log('Admin user created successfully!');
    console.log('Email: admin@indhu.com');
    console.log('Password: admin123');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

createAdmin();