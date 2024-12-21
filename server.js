const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const storyRoutes = require('./routes/storyRoutes');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/stories', storyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
