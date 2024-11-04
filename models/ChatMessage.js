const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  participants: {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  messages: [
    {
      content: { type: String, required: true },
      status: {
        type: String,
        enum: ['pending', 'sent'],
        default: 'pending',
      },
      timestamp: { type: Date, default: Date.now },
    }
  ],
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);
module.exports = ChatMessage;
