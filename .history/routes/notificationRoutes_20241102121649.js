// routes/notifications.js
const express = require('express');

const notificationController = require('../controllers/notificationController');
const authController = require('../controllers/authController');

const router = express.Router();
router.use(authController.protect);

// Routes for notifications
router.route('/')
    .get(notificationController.getAllNotifications) // Get all notifications
    .post(notificationController.createNotification); // Create a new notification

router.route('/:notificationId')
    .patch(notificationController.markAsRead) // Mark as read
    .delete(notificationController.deleteNotification); // Delete a notification

module.exports = router;
