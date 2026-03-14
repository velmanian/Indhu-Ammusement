"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const database_1 = require("./lib/database");
const seedAdmin_1 = require("./lib/seedAdmin");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const public_routes_1 = __importDefault(require("./routes/public.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Allowed CORS origins (local + deployed frontends)
const allowedOrigins = [
    "http://localhost:3000",
    "https://indhu-ammusement.vercel.app",
    "https://indhu-industries.vercel.app", // Anticipating possible aliases
    // Allow configuring extra origins via env without code changes
    process.env.CLIENT_URL || "",
    process.env.CLIENT_URL_PROD || "",
].filter(Boolean);
// CORS configuration
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Allow non-browser tools (no Origin header)
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error(`CORS blocked for origin: ${origin}`), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
}));
// Ensure uploads directory exists
const uploadsDir = path_1.default.join(__dirname, '..', 'uploads');
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
}
app.use(express_1.default.json());
// Serve uploaded images as static files
app.use('/uploads', express_1.default.static(uploadsDir));
// Mount API routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/public', public_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
// Simple test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});
// Simple enquiry endpoint without database
app.post('/api/public/enquiry', (req, res) => {
    console.log('Received enquiry:', req.body);
    // Simulate WhatsApp message sending
    console.log('Would send to WhatsApp:', req.body);
    res.json({
        success: true,
        message: 'Enquiry received successfully',
        enquiryId: Date.now()
    });
});
// Basic health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Indhu Industries API is running' });
});
// Connect to MongoDB and start server
(0, database_1.connectDB)().then(async () => {
    // Ensure there is at least one admin user
    await (0, seedAdmin_1.ensureDefaultAdmin)();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log('Test endpoint: http://localhost:5000/api/test');
        console.log('Enquiry endpoint: http://localhost:5000/api/public/enquiry');
        if ((0, database_1.getIsConnected)()) {
            console.log('✅ MongoDB connected successfully');
        }
        else {
            console.log('⚠️ Running in offline mode - using local fallback data');
        }
    });
}).catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    console.warn('Server starting without database connectivity...');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} (offline mode)`);
        console.log('Test endpoint: http://localhost:5000/api/test');
        console.log('Enquiry endpoint: http://localhost:5000/api/public/enquiry');
        console.log('Running in offline mode - some features may be unavailable');
    });
});
