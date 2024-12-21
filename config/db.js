const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) throw new Error('Mongo URI is missing!');

        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
