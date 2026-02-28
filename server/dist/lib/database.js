"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectDB = void 0;
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
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        console.warn('Server will start without database connectivity. Some features may be unavailable.');
        // Don't exit the process, allow the server to start with limited functionality
    }
};
exports.connectDB = connectDB;
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
