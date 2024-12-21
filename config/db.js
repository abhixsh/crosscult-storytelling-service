const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI; // Get MongoDB URI from .env file
        if (!uri) {
            throw new Error('Mongo URI is undefined in .env');
        }
        await mongoose.connect(uri); // Connect to MongoDB
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process if DB connection fails
    }
};

module.exports = connectDB;
