// controllers/messagesController.js

const chatMessage = require('../models/ChatMessage');
// Ensure you import the Request model
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Get all messages for a recipient
exports.getAllMessages = catchAsync(async (req, res, next) => {
    const recipientId = req.params.id;
    const messages = await chatMessage.find({ recipient: recipientId });

    if (!messages || messages.length === 0) {
        return res.status(404).json({ message: 'No messages found for this recipient.' });
    }

    return res.status(200).json(messages); 
});

// Create a new message
exports.createMessage = catchAsync(async (req, res, next) => {
    const { recipient, content, status } = req.body;

    // Ensure req.user is set
    if (!req.user || !req.user._id) {
        return next(new AppError('User is not authenticated', 401));
    }

    // Validate that content is an array and not empty
    if (!Array.isArray(content) || content.length === 0) {
        return next(new AppError('Content must be a non-empty array of strings.', 400));
    }

    const message = await chatMessage.create({
        sender: req.user._id, // Ensure you access _id safely
        recipient,
        content,
        status,
        timestamp: Date.now(),
    });

    return res.status(201).json({ message }); // Send the newly created message in the response
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
