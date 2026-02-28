// Test script to verify WhatsApp URL encoding
const { formatWhatsAppMessage, generateWhatsAppUrl } = require('./dist/utils/whatsapp.utils');

// Test data with special characters and emojis
const testData = {
  name: "John Doe 🎡",
  phone: "9876543210",
  location: "Chennai, Tamil Nadu 🇮🇳",
  selectedProducts: [
    { name: "Ferris Wheel 🎠" },
    { name: "Bumper Cars 🚗" }
  ],
  usagePurpose: ["Commercial Park", "Entertainment"],
  additionalInfo: "Looking for weekend packages with special characters: & % $ # @ ! 😊",
  productId: "123",
  message: "Product enquiry with emojis 🎉 and symbols @#$%"
};

console.log("=== WhatsApp URL Encoding Test ===\n");

// Generate formatted message
const message = formatWhatsAppMessage(testData);
console.log("Formatted Message:");
console.log(message);
console.log("\n" + "=".repeat(50) + "\n");

// Generate WhatsApp URL
try {
  const whatsappUrl = generateWhatsAppUrl(message, "919876543210");
  console.log("Generated WhatsApp URL:");
  console.log(whatsappUrl);
  console.log("\nURL Length:", whatsappUrl.length);
  
  // Verify the URL is valid
  const url = new URL(whatsappUrl);
  console.log("\n✅ URL is valid");
  console.log("Protocol:", url.protocol);
  console.log("Hostname:", url.hostname);
  console.log("Text parameter length:", url.searchParams.get('text').length);
  
} catch (error) {
  console.error("❌ Error generating URL:", error.message);
}

console.log("\n" + "=".repeat(50));
console.log("Test completed!");