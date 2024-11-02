// controllers/notificationController.js
const Notification = require('../models/notification');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Get all notifications for a user
exports.getAllNotifications = catchAsync(async (req, res, next) => {
    const {recipientId}=req.params;
    const notifications = await Notification.find({ recipient: recipientId });

    if (!notifications || notifications.length === 0) {
        return res.status(404).json({ message: 'No notifications found.' });
    }

    return res.status(200).json(notifications);
});

// Create a new notification
exports.createNotification = catchAsync(async (req, res, next) => {
    const {recipientId}=req.params;
    const { message } = req.body;

    if (!req.user || !req.user._id) {
        return next(new AppError('User is not authenticated', 401));
    }

    const notification = new Notification({
        notificationId: generateNotificationId(), // Use a function to generate a unique ID
        recipient:recipientId,
        message,
    });

    await notification.save();
    return res.status(201).json(notification);
});

// Mark a notification as read
exports.markAsRead = catchAsync(async (req, res, next) => {
    const { recipientId,notificationId } = req.params;

    const notification = await Notification.findOne({ notificationId, recipientId });

    if (!notification) {
        return next(new AppError('Notification not found', 404));
    }

    notification.isRead = true;
    await notification.save();

    return res.status(200).json(notification);
});

// Delete a notification
exports.deleteNotification = catchAsync(async (req, res, next) => {
    const {recipientId, notificationId } = req.params;

    const notification = await Notification.findOneAndDelete({ notificationId, recipientId });

    if (!notification) {
        return next(new AppError('Notification not found or you are not authorized to delete this notification.', 404));
    }

    return res.status(204).send(); // No content
});

// Function to generate a unique notification ID
const generateNotificationId = () => {
    return `notif_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
};
