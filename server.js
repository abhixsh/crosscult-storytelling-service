const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const storyRoutes = require('./routes/storyRoutes');
const cors = require('cors');

// Swagger dependencies
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Import your swagger.json here

dotenv.config();
connectDB();

const app = express();

// Serve Swagger documentation using the imported swagger.json
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cors());

// Use Story Routes
app.use('/stories', storyRoutes);

// API route for fetching Swagger spec (optional if you want to serve JSON directly)
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocument);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});
