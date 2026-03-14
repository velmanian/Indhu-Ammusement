"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.getIsConnected = exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let isConnected = false;
const connectDB = async () => {
    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL is not defined in environment variables');
        }
        await mongoose_1.default.connect(process.env.DATABASE_URL);
        isConnected = true;
        console.log('✅ MongoDB connected successfully to Atlas');
    }
    catch (error) {
        if (error.message.includes('ECONNREFUSED')) {
            console.error('❌ Connection Refused: Could not reach MongoDB Atlas. Check your internet or VPN.');
        }
        else if (error.message.includes('querySrv ENOTFOUND')) {
            console.error('❌ DNS Error: Could not resolve MongoDB Atlas hostname. This is likely a network/DNS issue.');
        }
        else if (error.message.includes('Authentication failed')) {
            console.error('❌ Auth Error: Invalid DATABASE_URL credentials.');
        }
        else {
            console.error('❌ MongoDB Connection Error:', error.message);
        }
        console.warn('⚠️ Server will continue in OFFLINE MODE (Data will be saved locally to fallbackData.json)');
        throw error; // Re-throw so index.ts handles the failure
    }
};
exports.connectDB = connectDB;
const getIsConnected = () => isConnected;
exports.getIsConnected = getIsConnected;
const disconnectDB = async () => {
    if (!isConnected) {
        return;
    }
    try {
        await mongoose_1.default.disconnect();
        isConnected = false;
        console.log('MongoDB disconnected');
    }
    catch (error) {
        console.error('Error disconnecting from MongoDB:', error);
    }
};
exports.disconnectDB = disconnectDB;
