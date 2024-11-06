// routes/notifications.js
const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { protect } = require('../middlewares/auth'); // Assuming you have an auth middleware to protect routes

// Protect routes
router.use(protect);

// Routes for notifications
router.route('/')
    .get(notificationController.getAllNotifications) // Get all notifications
    .post(notificationController.createNotification); // Create a new notification

router.route('/:notificationId')
    .patch(notificationController.markAsRead) // Mark as read
    .delete(notificationController.deleteNotification); // Delete a notification

module.exports = router;
