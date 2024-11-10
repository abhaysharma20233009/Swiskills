const fs = require('fs');
const express = require('express');

const app = express();

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const skillsRouter = require('./routes/skillsRoutes');
const userRouter = require('./routes/userRoutes');
const requestsRouter = require('./routes/requestsRoutes');
const swapsRouter = require('./routes/swapsRoutes');
const reviewRouter = require('./routes/reviewsRoutes');


const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

//cookie-parser
app.use(cookieParser());

dotenv.config();
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dw4p8fd7r',
  api_key: '722164512214482',
  api_secret: 'AS1AYdTcMbrj-sZpkNBfxl-03Rs',
});

app.use('/api/v1/skills', skillsRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/requests', requestsRouter);
app.use('/api/v1/swaps', swapsRouter);

app.use('/api/v1/reviews', reviewRouter);

// 404 handler for undefined routes
app.use('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

//ERROR HEADLING MIDDLEWARE

app.use(globalErrorHandler);

module.exports = app; // Export both app and server instances
