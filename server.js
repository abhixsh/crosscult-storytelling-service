const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const storyRoutes = require('./routes/storyRoutes');

dotenv.config(); // Load environment variables

const app = express();
connectDB(); // Connect to MongoDB

app.use(express.json()); // Parse incoming JSON
app.use(cors()); // Enable CORS

// Story Routes
app.use('/stories', storyRoutes);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
