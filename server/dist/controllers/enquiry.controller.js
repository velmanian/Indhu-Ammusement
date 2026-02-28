"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnquiries = exports.updateEnquiryStatus = exports.submitEnquiry = void 0;
const Enquiry_1 = require("../models/Enquiry");
const Product_1 = require("../models/Product");
const whatsapp_utils_1 = require("../utils/whatsapp.utils");
const submitEnquiry = async (req, res) => {
    try {
        const { name, phone, email, location, message, productId, selectedProducts, usagePurpose, additionalInfo } = req.body;
        // Validate required data
        if (!(0, whatsapp_utils_1.validateWhatsAppData)({ name, phone, location })) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: name, phone, and location are required'
            });
        }
        // Create enquiry in database
        let product = null;
        if (productId) {
            product = await Product_1.ProductModel.findById(productId);
        }
        const enquiryData = {
            name,
            phone,
            email: email || '',
            location,
            message: message || 'Product enquiry',
        };
        if (product) {
            enquiryData.productId = product._id;
        }
        // Handle selected products array from the form
        if (selectedProducts && selectedProducts.length > 0) {
            enquiryData.selectedProducts = selectedProducts;
        }
        const enquiry = new Enquiry_1.EnquiryModel(enquiryData);
        await enquiry.save();
        // Populate the product data
        await enquiry.populate('productId', 'name slug description');
        // Generate formatted WhatsApp message using utility function
        const whatsappMessage = (0, whatsapp_utils_1.formatWhatsAppMessage)({
            name,
            phone,
            location,
            selectedProducts,
            usagePurpose,
            additionalInfo,
            productId,
            message: message || 'Product enquiry'
        });
        const adminWhatsAppNumber = '916379026500'; // Your actual WhatsApp number
        // Generate the click-to-chat URL using utility function
        const whatsappUrl = (0, whatsapp_utils_1.generateWhatsAppUrl)(whatsappMessage, adminWhatsAppNumber);
        // Log for debugging (in production, you might want to remove this)
        console.log('Generated WhatsApp URL:', whatsappUrl);
        console.log('Message length:', whatsappMessage.length);
        // Optional: Send to WhatsApp Business API (uncomment when ready)
        /*
        try {
          await axios.post('https://graph.facebook.com/v17.0/your-phone-id/messages', {
            messaging_product: 'whatsapp',
            to: adminWhatsAppNumber,
            text: { body: whatsappMessage }
          }, {
            headers: {
              'Authorization': 'Bearer your-access-token',
              'Content-Type': 'application/json'
            }
          });
        } catch (whatsappError) {
          console.error('Error sending WhatsApp message via API:', whatsappError);
          // Don't fail the request if WhatsApp sending fails
        }
        */
        res.status(201).json({
            success: true,
            message: 'Enquiry submitted successfully',
            enquiryId: enquiry.id,
            whatsappUrl: whatsappUrl // Include the generated WhatsApp URL
        });
    }
    catch (error) {
        console.error('Error submitting enquiry:', error);
        res.status(500).json({ message: 'Error submitting enquiry', error });
    }
};
exports.submitEnquiry = submitEnquiry;
const updateEnquiryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        // Validate status
        if (!['PENDING', 'RESPONDED', 'CLOSED'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        const enquiry = await Enquiry_1.EnquiryModel.findByIdAndUpdate(id, { status }, { new: true } // Return updated document
        ).populate({
            path: 'productId',
            select: 'name slug description images categoryId',
            populate: {
                path: 'categoryId',
                select: 'name slug description'
            }
        });
        if (!enquiry) {
            return res.status(404).json({ message: 'Enquiry not found' });
        }
        res.json(enquiry);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating enquiry status', error });
    }
};
exports.updateEnquiryStatus = updateEnquiryStatus;
const getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry_1.EnquiryModel.find()
            .populate({
            path: 'productId',
            select: 'name slug description images categoryId',
            populate: {
                path: 'categoryId',
                select: 'name slug description'
            }
        })
            .select('-__v') // Exclude version key
            .sort({ createdAt: -1 });
        res.json(enquiries);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching enquiries', error });
    }
};
exports.getEnquiries = getEnquiries;
