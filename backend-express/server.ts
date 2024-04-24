import path from 'path';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'

import apiRoutes from './routes/api';

import swaggerUi from "swagger-ui-express"
import swaggerFile from './public/swagger.json';

// Initialize express
const app = express();

// Allow express to understand cookies (required for HttpOnly)
app.use(cookieParser());

// Middleware for JSON parsing
app.use(express.json());

// Cross Origin
app.use(cors({
  origin: process.env.BASE_URL,
  credentials: true
}));

// Set JSON formatting
app.set('json spaces', 2);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve swagger api docs
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Start the server only if the database connection is successful
const PORT = process.env.PORT || 5000;
  
// Use routes
app.use(apiRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
