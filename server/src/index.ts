import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { connectDB } from './lib/database';
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



// Connect to MongoDB and start server
connectDB().then(async () => {
  // Ensure there is at least one admin user
  await ensureDefaultAdmin();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Test endpoint: http://localhost:5000/api/test');
    console.log('Enquiry endpoint: http://localhost:5000/api/public/enquiry');
    if (process.env.DATABASE_URL) {
      console.log('MongoDB connected successfully');
    } else {
      console.log('Running in offline mode - some features may be unavailable');
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
