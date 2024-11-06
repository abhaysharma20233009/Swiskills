// controllers/messagesController.js

const ChatMessage = require('../models/ChatMessage');
const APIFeatures = require('../utils/apiFeature');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Get all messages
exports.getAllMessages = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(ChatMessage.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const messages = await features.query;

    res.status(200).json({
        status: 'success',
        results: messages.length,
        data: {
            messages,
        },
    });
});

// Create a new message
exports.createMessage = catchAsync(async (req, res, next) => {
    const { sender, content, recipient } = req.body;

    if (!sender || !content || !recipient) {
        return next(new AppError('Sender, recipient, and content are required', 400));
    }

    const chatMessage = await ChatMessage.create({ sender, content, recipient });

    res.status(201).json({
        status: 'success',
        data: {
            message: chatMessage,
        },
    });
});

// Update a message
exports.updateMessage = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { sender, content } = req.body;

    const message = await ChatMessage.findById(id);
    if (!message) {
        return next(new AppError('Message not found', 404));
    }

    // Check if the message is older than 10 minutes
    const now = new Date();
    const messageTime = new Date(message.timestamp); // Use the correct field for timestamp
    const tenMinutesAgo = new Date(now - 10 * 60 * 1000);

    if (message.sender !== sender && sender !== "IamAdmin") {
        return next(new AppError('You are not authorized to edit this message', 403));
    }

    if (messageTime < tenMinutesAgo) {
        return next(new AppError('You can only edit a message within 10 minutes', 400));
    }

    message.content = content || message.content; // Update if new content is provided
    await message.save();

    res.status(200).json({
        status: 'success',
        data: {
            message,
        },
    });
});

// Delete a message
exports.deleteMessage = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { sender } = req.body;

    const message = await ChatMessage.findById(id);
    if (!message) {
        return next(new AppError('Message not found', 404));
    }

    // Allow deletion if the sender matches or if the sender is the admin
    if (message.sender === sender || sender === "IamAdmin") {
        await ChatMessage.findByIdAndDelete(id);
        return res.status(204).send(); // No content
    } else {
        return next(new AppError('You are not authorized to delete this message', 403));
    }
});
