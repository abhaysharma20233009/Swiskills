const fs = require('fs');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const errorHandler = require('./middleware/errorHandler');

const skillsRouter = require('./routes/skillsRoutes');
const userRouter = require('./routes/userRoutes');
const requestsRouter = require('./routes/requestsRoutes');
const swapsRouter = require('./routes/swapsRoutes');
const messagesRouter = require('./routes/messages');
const notificationRouter = require('./routes/notificationRoutes');

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/skills', skillsRouter);
app.use('/api/v1/users', userRouter)
app.use('/api/v1/notifications/', notificationRouter);
app.use('/api/v1/requests', requestsRouter);
app.use('/api/v1/swaps', swapsRouter);
app.use('/api/v1/messages', messagesRouter);

// 404 handler for undefined routes
app.use('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler);
app.use(globalErrorHandler); 

module.exports = app;
