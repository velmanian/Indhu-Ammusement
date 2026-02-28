"use strict";
/**
 * WhatsApp Utility Functions
 * Production-ready utilities for generating WhatsApp click-to-chat URLs
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateWhatsAppData = exports.generateWhatsAppUrl = exports.formatWhatsAppMessage = void 0;
/**
 * Generates a properly formatted WhatsApp message from enquiry data
 * @param data - Enquiry data object
 * @returns Formatted message string
 */
const formatWhatsAppMessage = (data) => {
    const { name, phone, location, selectedProducts = [], usagePurpose = [], additionalInfo = 'N/A', productId = 'General enquiry', message = 'Product enquiry' } = data;
    // Format product list
    const productsList = selectedProducts.length > 0
        ? selectedProducts.map(p => `- ${p.name}`).join('\n')
        : 'Not specified';
    // Format usage purposes
    const purposesList = usagePurpose.length > 0
        ? usagePurpose.join(', ')
        : 'Not specified';
    // Create the formatted message
    return `*New Product Enquiry*

*Customer Details:*
Name: ${name}
Phone: ${phone}
Place: ${location}

*Selected Products:*
${productsList}

*Usage Purpose:*
${purposesList}

*Additional Info:*
${additionalInfo}

*Product ID:*
${productId}

*Message:*
${message}`;
};
exports.formatWhatsAppMessage = formatWhatsAppMessage;
/**
 * Safely generates a WhatsApp click-to-chat URL
 * Properly handles URL encoding for all characters including spaces, emojis, and special characters
 * @param message - The message to send
 * @param phoneNumber - WhatsApp phone number (country code + number, no + or 00 prefix)
 * @returns Complete WhatsApp URL
 */
const generateWhatsAppUrl = (message, phoneNumber) => {
    try {
        // Validate inputs
        if (!message || !phoneNumber) {
            throw new Error('Message and phone number are required');
        }
        // Clean the message - decode any existing encoding to prevent double encoding
        let cleanMessage = message;
        try {
            cleanMessage = decodeURIComponent(message);
        }
        catch (e) {
            // If decode fails, use original message
            cleanMessage = message;
        }
        // Properly URL encode the entire message
        // encodeURIComponent handles all special characters, spaces, emojis, etc.
        const encodedMessage = encodeURIComponent(cleanMessage);
        // Validate phone number format (remove +, 00, and spaces)
        const cleanPhoneNumber = phoneNumber
            .replace(/^\+/, '') // Remove leading +
            .replace(/^00/, '') // Remove leading 00
            .replace(/\s+/g, ''); // Remove all spaces
        // Validate phone number contains only digits
        if (!/^\d+$/.test(cleanPhoneNumber)) {
            throw new Error('Invalid phone number format');
        }
        // Construct the WhatsApp URL
        // wa.me service automatically handles the URL encoding
        return `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;
    }
    catch (error) {
        console.error('Error generating WhatsApp URL:', error);
        throw new Error(`Failed to generate WhatsApp URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
exports.generateWhatsAppUrl = generateWhatsAppUrl;
/**
 * Validates WhatsApp message data
 * @param data - Message data to validate
 * @returns boolean indicating if data is valid
 */
const validateWhatsAppData = (data) => {
    return !!(data.name && data.phone && data.location);
};
exports.validateWhatsAppData = validateWhatsAppData;
/**
 * Example usage:
 *
 * const enquiryData = {
 *   name: "John Doe",
 *   phone: "9876543210",
 *   location: "Chennai, Tamil Nadu",
 *   selectedProducts: [{ name: "Ferris Wheel" }, { name: "Carousel" }],
 *   usagePurpose: ["Commercial Park", "Entertainment"],
 *   additionalInfo: "Looking for weekend packages 🎡",
 *   productId: "123"
 * };
 *
 * const message = formatWhatsAppMessage(enquiryData);
 * const whatsappUrl = generateWhatsAppUrl(message, "919876543210");
 *
 * // Result: "https://wa.me/919876543210?text=*New%20Product%20Enquiry*%0A%0A*Customer%20Details*%3A%0AName%3A%20John%20Doe..."
 */ 
