// controllers/messagesController.js
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



// // Update a message
// exports.updateMessage = catchAsync(async (req, res, next) => {
//     const { id } = req.params;
//     const { sender, content } = req.body;

//     const message = await ChatMessage.findById(id);
//     if (!message) {
//         return next(new AppError('Message not found', 404));
//     }

//     // Check if the message is older than 10 minutes
//     const now = new Date();
//     const messageTime = new Date(message.timestamp); // Use the correct field for timestamp
//     const tenMinutesAgo = new Date(now - 10 * 60 * 1000);

//     if (message.sender !== sender && sender !== "IamAdmin") {
//         return next(new AppError('You are not authorized to edit this message', 403));
//     }

//     if (messageTime < tenMinutesAgo) {
//         return next(new AppError('You can only edit a message within 10 minutes', 400));
//     }

//     message.content = content || message.content; // Update if new content is provided
//     await message.save();

//     res.status(200).json({
//         status: 'success',
//         data: {
//             message,
//         },
//     });
// });

// // Delete a message
// exports.deleteMessage = catchAsync(async (req, res, next) => {
//     const { id } = req.params;
//     const { sender } = req.body;

//     const message = await ChatMessage.findById(id);
//     if (!message) {
//         return next(new AppError('Message not found', 404));
//     }

//     // Allow deletion if the sender matches or if the sender is the admin
//     if (message.sender === sender || sender === "IamAdmin") {
//         await ChatMessage.findByIdAndDelete(id);
//         return res.status(204).send(); // No content
//     } else {
//         return next(new AppError('You are not authorized to delete this message', 403));
//     }
// });
