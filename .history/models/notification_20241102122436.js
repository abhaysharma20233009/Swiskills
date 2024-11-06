
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    notificationId: {
        type: String,
        required: true,
        unique: true,
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
});

const notification = mongoose.model('notification', notificationSchema);
module.exports = notification;
