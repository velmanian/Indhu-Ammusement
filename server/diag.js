const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.DATABASE_URL;

console.log("Testing connection to:", uri.replace(/:([^@]+)@/, ':****@'));

async function test() {
    try {
        console.log("Connecting...");
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log("✅ SUCCESS: Mongoose connected to MongoDB Atlas!");
        process.exit(0);
    } catch (err) {
        console.error("❌ FAILED:", err.message);
        console.log("\nPossible solutions:");
        if (err.message.includes('ECONNREFUSED')) {
            console.log("- Your network blocks SRV. Use the 'Standard' (longer) connection string.");
        } else if (err.message.includes('timeout')) {
            console.log("- Check your IP Whitelist in Atlas (Network Access). Make sure 0.0.0.0/0 is active.");
            console.log("- Check if any local firewall (antivirus) blocks port 27017.");
        }
        process.exit(1);
    }
}

test();
