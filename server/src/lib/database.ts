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

    await mongoose.connect(process.env.DATABASE_URL, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging indefinitely
    });
    isConnected = true;
    console.log('✅ MongoDB connected successfully to Atlas');
  } catch (error: any) {
    if (error.message.includes('ECONNREFUSED')) {
      console.error('❌ Connection Refused: Could not reach MongoDB Atlas. Check your internet or VPN.');
    } else if (error.message.includes('querySrv ENOTFOUND')) {
      console.error('❌ DNS Error: Could not resolve MongoDB Atlas hostname. This is likely a network/DNS issue.');
    } else if (error.message.includes('Authentication failed')) {
      console.error('❌ Auth Error: Invalid DATABASE_URL credentials.');
    } else {
      console.error('❌ MongoDB Connection Error:', error.message);
    }

    console.warn('⚠️ Server will continue in OFFLINE MODE (Data will be saved locally to fallbackData.json)');
    throw error; // Re-throw so index.ts handles the failure
  }
};

export const getIsConnected = () => isConnected;

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