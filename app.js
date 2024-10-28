const fs = require('fs');
const express = require('express');
const app = express();
const skillsRouter = require('./routes/skillsRoutes');
const userRouter = require('./routes/userRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

//Body parser,reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/skills', skillsRouter);
app.use('/api/v1/users', userRouter);

app.use('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

//ERROR HEADLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
