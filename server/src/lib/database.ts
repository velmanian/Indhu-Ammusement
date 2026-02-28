import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

export const connectDB = async (): Promise<void> => {
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined in environment variables');
    }

    await mongoose.connect(process.env.DATABASE_URL);
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    console.warn('Server will start without database connectivity. Some features may be unavailable.');
    // Don't exit the process, allow the server to start with limited functionality
  }
};

export const disconnectDB = async (): Promise<void> => {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
  }
};