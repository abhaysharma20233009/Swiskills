const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  messages: [
    {
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

      recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	   // Added recipient
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
