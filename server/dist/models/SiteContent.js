"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteContentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const siteContentSchema = new mongoose_1.default.Schema({
    key: {
        type: String,
        required: true,
        unique: true,
    },
    value: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
});
exports.SiteContentModel = mongoose_1.default.model('SiteContent', siteContentSchema);
