import { Request, Response } from 'express';
import { EnquiryModel } from '../models/Enquiry';
import { ProductModel } from '../models/Product';
import axios from 'axios';
import { formatWhatsAppMessage, generateWhatsAppUrl, validateWhatsAppData } from '../utils/whatsapp.utils';

export const submitEnquiry = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, location, message, productId, selectedProducts, usagePurpose, additionalInfo } = req.body;

    // Validate required data
    if (!validateWhatsAppData({ name, phone, location })) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, phone, and location are required'
      });
    }

    // Create enquiry in database
    let product = null;
    let enquiryId = Date.now().toString();
    try {
      if (productId) {
        product = await ProductModel.findById(productId);
      }

      const enquiryData: any = {
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

      const enquiry = new EnquiryModel(enquiryData);
      await enquiry.save();

      // Populate the product data
      await enquiry.populate('productId', 'name slug description');
      enquiryId = enquiry.id;
    } catch (dbError) {
      console.error('Warning: Failed to save enquiry to database, but continuing with WhatsApp URL generation:', dbError);
    }

    // Generate formatted WhatsApp message using utility function
    const whatsappMessage = formatWhatsAppMessage({
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
    const whatsappUrl = generateWhatsAppUrl(whatsappMessage, adminWhatsAppNumber);

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
      enquiryId: enquiryId,
      whatsappUrl: whatsappUrl // Include the generated WhatsApp URL
    });
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    res.status(500).json({ message: 'Error submitting enquiry', error });
  }
};

export const updateEnquiryStatus = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { status } = req.body;

    // Validate status
    if (!['PENDING', 'RESPONDED', 'CLOSED'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const enquiry = await EnquiryModel.findByIdAndUpdate(
      id,
      { status },
      { new: true } // Return updated document
    ).populate({
      path: 'productId',
      select: 'name slug description images categoryId',
      populate: {
        path: 'category',
        select: 'name slug description'
      }
    });

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.json(enquiry);
  } catch (error: any) {
    console.error('Error in updateEnquiryStatus:', error);
    res.status(500).json({ message: 'Error updating enquiry status', error: error.message || error });
  }
};

export const getEnquiries = async (req: Request, res: Response) => {
  try {
    const enquiries = await EnquiryModel.find()
      .populate({
        path: 'productId',
        select: 'name slug description images categoryId',
        populate: {
          path: 'category',
          select: 'name slug description'
        }
      })
      .select('-__v') // Exclude version key
      .sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error: any) {
    console.error('Error in getEnquiries:', error);
    res.status(500).json({ message: 'Error fetching enquiries', error: error.message || error });
  }
};

export const getEnquiryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const enquiry = await EnquiryModel.findById(id)
      .populate({
        path: 'productId',
        select: 'name slug description images categoryId',
        populate: {
          path: 'category',
          select: 'name slug description'
        }
      })
      .select('-__v'); // Exclude version key

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.json(enquiry);
  } catch (error: any) {
    console.error('Error in getEnquiryById:', error);
    res.status(500).json({ message: 'Error fetching enquiry', error: error.message || error });
  }
};
export const deleteEnquiry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const enquiry = await EnquiryModel.findByIdAndDelete(id);

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error: any) {
    console.error('Error in deleteEnquiry:', error);
    res.status(500).json({ message: 'Error deleting enquiry', error: error.message || error });
  }
};
