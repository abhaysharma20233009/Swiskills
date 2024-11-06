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
const messagesRouter = require('./routes/messages');
const notificationRouter = require('./routes/notificationRoutes');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv');
dotenv.config();
// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/v1/skills', skillsRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/notifications/', notificationRouter);
app.use('/api/v1/requests', requestsRouter);
app.use('/api/v1/swaps', swapsRouter);
app.use('/api/v1/messages', messagesRouter);
app.use('/api/v1/reviews', reviewRouter);

// 404 handler for undefined routes
app.use('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

//ERROR HEADLING MIDDLEWARE
app.use(errorHandler);
app.use(globalErrorHandler);

module.exports =  app; // Export both app and server instances

