const mongoose = require("mongoose");
require("dotenv").config(); // Load biến môi trường từ .env

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected successfully!");
    } catch (error) {
        console.error(" MongoDB connection error:", error);
        process.exit(1); // Thoát chương trình nếu lỗi
    }
};

module.exports = connectToDatabase;
    