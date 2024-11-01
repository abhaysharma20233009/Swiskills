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

exports.updateMessage = catchAsync(async (req, res, next) => {
    const { recipientId, messageId } = req.params; // Assuming these are ObjectId

    const chat = await ChatMessage.findOne({
        'participants.recipient': recipientId,
        'messages._id': messageId,
    });

    if (!chat) {
        return next(new AppError('Chat or message not found', 404));
    }

    // Find the specific message
    const message = chat.messages.id(messageId);
    if (!message) {
        return next(new AppError('Message not found', 404));
    }

    // Check if the message is editable (within 10 minutes)
    const now = new Date();
    const messageTime = new Date(message.timestamp);
    const tenMinutesAgo = new Date(now - 10 * 60 * 1000);

    if (messageTime < tenMinutesAgo) {
        return next(new AppError('You can only edit a message within 10 minutes of sending.', 403));
    }

    // Update content if provided
    if (req.body.content) {
        message.content = req.body.content;
    }

    await chat.save();
    return res.status(200).json({ chat });
});


exports.deleteMessage = catchAsync(async (req, res, next) => {
    const { messageId } = req.params; // Expecting messageId from the request parameters

    // Find the chat involving the message
    const chat = await ChatMessage.findOne({
        'messages._id': messageId,
        $or: [
            { 'participants.sender': req.user._id },
            { 'participants.recipient': req.user._id },
        ],
    });

    if (!chat) {
        return next(new AppError('Message not found or you are not authorized to delete this message.', 404));
    }

    // Filter out the message to be deleted
    chat.messages = chat.messages.filter(msg => !msg._id.equals(messageId));

    await chat.save();
    return res.status(204).send(); // No content
});