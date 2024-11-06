const ChatMessage = require('../models/ChatMessage');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Get all messages for a conversation between two users
exports.getAllMessages = catchAsync(async (req, res, next) => {
    const { recipientId } = req.params; // Extracting recipientId from route params

    // Find the chat message by participants
    const chat = await ChatMessage.findOne({
        'participants.sender': req.user._id,
        'participants.recipient': recipientId,
    });

    // Check if the chat exists and has messages
    if (!chat || !chat.messages || chat.messages.length === 0) {
        return res.status(404).json({ message: 'No messages found for this conversation.' });
    }

    return res.status(200).json(chat.messages); 
});

// Create a new message in a conversation
exports.createMessage = catchAsync(async (req, res, next) => {
    const { recipientId } = req.params; // Extracting recipientId from route params
    const { content, status } = req.body;

    // Ensure req.user is set
    if (!req.user || !req.user._id) {
        return next(new AppError('User is not authenticated', 401));
    }

    // Validate that content is a string
    if (typeof content !== 'string' || content.trim() === '') {
        return next(new AppError('Content must be a non-empty string.', 400));
    }

    // Check if the chat already exists for the sender and recipient
    const chat = await ChatMessage.findOne({
        'participants.sender': req.user._id,
        'participants.recipient': recipientId,
    });

    const messageData = {
        content,
        status,
        timestamp: Date.now(), // Set timestamp when creating the message
    };

    if (chat) {
        // If chat exists, push the new message into the messages array
        chat.messages.push(messageData);
    } else {
        // If chat does not exist, create a new one
        const newChat = await ChatMessage.create({
            participants: {
                sender: req.user._id,
                recipient: recipientId,
            },
            messages: [messageData],
        });
        return res.status(201).json({ chat: newChat });
    }

    await chat.save();
    return res.status(200).json({ chat }); 
});

// Update a message within 15 minutes
const mongoose = require('mongoose');

exports.updateMessage = catchAsync(async (req, res, next) => {
    const { recipientId, messageId } = req.params;

    // Convert strings to ObjectId
    const recipientObjectId = mongoose.Types.ObjectId(recipientId);
    const messageObjectId = mongoose.Types.ObjectId(messageId);

    const chat = await ChatMessage.findOne({
        'participants.recipient': recipientObjectId,
        'messages._id': messageObjectId,
    });

    if (!chat) {
        return next(new AppError('Chat or message not found', 404));
    }

    // Update message logic here...

    await chat.save();
    return res.status(200).json({ chat });
});

exports.deleteMessage = catchAsync(async (req, res, next) => {
    const { recipientId, messageId } = req.params;

    // Convert strings to ObjectId
    const recipientObjectId = mongoose.Types.ObjectId(recipientId);
    const messageObjectId = mongoose.Types.ObjectId(messageId);

    const chat = await ChatMessage.findOne({
        'participants.recipient': recipientObjectId,
        'messages._id': messageObjectId,
    });

    if (!chat) {
        return next(new AppError('Chat or message not found', 404));
    }

    // Delete message logic here...

    await chat.save();
    return res.status(204).send(); // No content
});
