import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isConnected = false;

export const connectDB = async (): Promise<void> => {
  if (isConnected) return;

  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined in environment variables');
    }

    // Set up listeners ONLY ONCE
    if (mongoose.connection.listeners('connected').length === 0) {
      mongoose.connection.on('connected', () => {
        isConnected = true;
        console.log('📡 MongoDB: Connected (LIVE)');
      });

      mongoose.connection.on('error', (err) => {
        isConnected = false;
        console.error('❌ MongoDB: Connection error:', err.message);
      });

      mongoose.connection.on('disconnected', () => {
        isConnected = false;
        console.warn('⚠️ MongoDB: Disconnected (OFFLINE MODE)');
        // Background reconnection is handled by Mongoose usually, 
        // but we'll trigger our manual retry if it was never initially connected.
        attemptReconnection();
      });
    }

    await mongoose.connect(process.env.DATABASE_URL, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    
  } catch (error: any) {
    isConnected = false;
    logDetailedError(error);
    console.warn('⚠️ Initial connection failed. Server is in OFFLINE MODE.');
    
    // Start background reconnection attempts if initial connect failed
    attemptReconnection();
    
    // We don't re-throw here so the server can start in offline mode
  }
};

const logDetailedError = (error: any) => {
  if (error.message.includes('ECONNREFUSED')) {
    console.error('❌ Connection Refused: Could not reach MongoDB Atlas.');
  } else if (error.message.includes('querySrv ENOTFOUND')) {
    console.error('❌ DNS Error: Could not resolve MongoDB hostname.');
  } else if (error.message.includes('Authentication failed')) {
    console.error('❌ Auth Error: Invalid DATABASE_URL credentials.');
  } else {
    console.error('❌ MongoDB Error:', error.message);
  }
};

let reconnectionTimeout: NodeJS.Timeout | null = null;
let retryCount = 0;

const attemptReconnection = () => {
  if (isConnected || reconnectionTimeout) return;

  const delay = Math.min(30000, Math.pow(2, retryCount) * 1000); // Max 30s delay
  console.log(`🔄 DB Reconnection: Attempting in ${delay / 1000}s... (Retry #${retryCount + 1})`);

  reconnectionTimeout = setTimeout(async () => {
    reconnectionTimeout = null;
    retryCount++;
    try {
      await connectDB();
      if (isConnected) {
        retryCount = 0; // Reset on success
      }
    } catch (err) {
      // Errors already logged in connectDB
    }
  }, delay);
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