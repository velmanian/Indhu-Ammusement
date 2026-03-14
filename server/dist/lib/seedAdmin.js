"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureDefaultAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mongoose_1 = __importDefault(require("mongoose"));
const AdminUser_1 = require("../models/AdminUser");
const ensureDefaultAdmin = async () => {
    const email = process.env.DEFAULT_ADMIN_EMAIL || 'admin@example.com';
    const password = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123';
    // Do not attempt to seed if database is not connected
    if (mongoose_1.default.connection.readyState !== 1) {
        console.log('Skipping default admin user creation: Database is not connected');
        return;
    }
    try {
        const defaultAdmins = [
            { email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@example.com', password: process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123', name: 'Admin' },
            { email: 'mani@gmail.com', password: '123', name: 'Mani' }
        ];
        for (const admin of defaultAdmins) {
            const existing = await AdminUser_1.AdminUserModel.findOne({ email: admin.email });
            if (existing) {
                console.log(`Admin user already exists with email: ${admin.email}`);
                continue;
            }
            const hashedPassword = await bcryptjs_1.default.hash(admin.password, 10);
            await AdminUser_1.AdminUserModel.create({
                email: admin.email,
                password: hashedPassword,
                name: admin.name,
            });
            console.log(`Admin user created: ${admin.email}`);
        }
    }
    catch (error) {
        console.error('Failed to ensure default admin users:', error);
    }
};
exports.ensureDefaultAdmin = ensureDefaultAdmin;
