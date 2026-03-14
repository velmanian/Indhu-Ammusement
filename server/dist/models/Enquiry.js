"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnquiryModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const enquirySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    productId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Product',
        required: false,
    },
    selectedProducts: {
        type: [{
                id: Number,
                name: String,
                slug: String,
                image: String,
                description: String,
                price: String,
                categoryId: Number,
                category: {
                    id: Number,
                    name: String,
                    slug: String
                }
            }],
        required: false,
    },
    usagePurpose: {
        type: [String],
        required: false,
    },
    status: {
        type: String,
        enum: ['PENDING', 'RESPONDED', 'CLOSED'],
        default: 'PENDING',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.EnquiryModel = mongoose_1.default.model('Enquiry', enquirySchema);
