"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AdminUser_1 = require("../models/AdminUser");
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user in MongoDB
        const user = await AdminUser_1.AdminUserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1d' });
        res.json({
            token,
            user: {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.login = login;
