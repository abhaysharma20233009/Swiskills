
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    // store all the notifications and senders for a recipient in an array
        recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   notification:[{
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: {
        type: String,
        default:"new message",
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
   }],
});

const notification = mongoose.model('notification', notificationSchema);
module.exports = notification;
