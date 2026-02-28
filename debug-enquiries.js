// Debug script to check enquiry data structure
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/indhu-industries')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import models
const { EnquiryModel } = require('./dist/models/Enquiry.js');

async function debugEnquiries() {
  try {
    console.log('=== Debugging Enquiries ===\n');
    
    // Get all enquiries
    const enquiries = await EnquiryModel.find()
      .populate({
        path: 'productId',
        select: 'name slug description images categoryId',
        populate: {
          path: 'categoryId',
          select: 'name slug description'
        }
      })
      .select('-__v')
      .sort({ createdAt: -1 });
    
    console.log(`Found ${enquiries.length} enquiries\n`);
    
    // Check each enquiry's structure
    enquiries.forEach((enq, index) => {
      console.log(`Enquiry #${index + 1} (ID: ${enq._id})`);
      console.log(`  Name: ${enq.name}`);
      console.log(`  Phone: ${enq.phone}`);
      console.log(`  Email: ${enq.email}`);
      console.log(`  Location: ${enq.location}`);
      console.log(`  Status: ${enq.status}`);
      
      // Check selectedProducts
      if (enq.selectedProducts) {
        console.log(`  Selected Products: ${enq.selectedProducts.length} items`);
        enq.selectedProducts.forEach((prod, prodIndex) => {
          console.log(`    Product ${prodIndex + 1}:`, prod);
        });
      } else {
        console.log(`  Selected Products: None`);
      }
      
      // Check product (single product enquiry)
      if (enq.product) {
        console.log(`  Product: ${enq.product.name}`);
      } else if (enq.productId) {
        console.log(`  Product ID: ${enq.productId}`);
      } else {
        console.log(`  Product: None`);
      }
      
      // Check usagePurpose
      if (enq.usagePurpose) {
        console.log(`  Usage Purpose: ${enq.usagePurpose.join(', ')}`);
      } else {
        console.log(`  Usage Purpose: None`);
      }
      
      console.log('---\n');
    });
    
    console.log('=== Debug Complete ===');
  } catch (error) {
    console.error('Debug error:', error);
  } finally {
    mongoose.connection.close();
  }
}

debugEnquiries();