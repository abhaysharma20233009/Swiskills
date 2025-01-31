const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const skillsRouter = require('./routes/skillsRoutes');
const userRouter = require('./routes/userRoutes');
const requestsRouter = require('./routes/requestsRoutes');
const swapsRouter = require('./routes/swapsRoutes');
const reviewRouter = require('./routes/reviewsRoutes');

// Initialize Express app
const app = express();

// Load environment variables
dotenv.config();

// Use cookie-parser middleware
app.use(cookieParser());

// Body parser middleware to read data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Cloudinary configuration (if required)
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'dw4p8fd7r',
  api_key: '722164512214482',
  api_secret: 'AS1AYdTcMbrj-sZpkNBfxl-03Rs',
});

// API Routes
app.use('/api/v1/skills', skillsRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/requests', requestsRouter);
app.use('/api/v1/swaps', swapsRouter);
app.use('/api/v1/reviews', reviewRouter);

// 404 handler for undefined routes
app.use('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handler middleware
app.use(globalErrorHandler);

module.exports = app;  // Export app for use in the server setup
