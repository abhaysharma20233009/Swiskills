// middleware/errorHandler.js

const AppError = require('../utils/appErrors');

const errorHandler = (err, req, res, next) => {
    // Set the status code and default message
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // Log the error for server-side debugging
    console.error('Error:', err);

    // Send the response
    res.status(err.statusCode).json({
        status: err.status || 'error',
        message: err.message,
    });
};

module.exports = errorHandler;
