import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { connectDB, getIsConnected } from './lib/database';
import { ensureDefaultAdmin } from './lib/seedAdmin';
import authRoutes from './routes/auth.routes';
import publicRoutes from './routes/public.routes';
import adminRoutes from './routes/admin.routes';


dotenv.config();


const app = express();
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
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser tools (no Origin header)
      if (!origin) return callback(null, true);

      // Check if origin is localhost or in allowed list
      if (origin.startsWith('http://localhost:') || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204,
  })
);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(express.json());

// Serve uploaded images as static files
app.use('/uploads', express.static(uploadsDir));

// Mount API routes
app.use('/api/auth', authRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);

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

// Connect to MongoDB and start server independently
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`🔗 Test endpoint: http://localhost:${PORT}/api/test`);
    console.log(`📩 Enquiry endpoint: http://localhost:${PORT}/api/public/enquiry`);
  });
};

// Start listening immediately
startServer();

// Then try to connect to DB in the background
connectDB().then(async () => {
  console.log('✅ MongoDB connection check complete');
  await ensureDefaultAdmin();
  if (getIsConnected()) {
    console.log('📡 Database is LIVE');
  }
}).catch((error) => {
  console.error('❌ Database connection failed:', error.message);
  console.warn('⚠️ Server is running in OFFLINE MODE');
});
