"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const adminUserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.AdminUserModel = mongoose_1.default.model('AdminUser', adminUserSchema);
