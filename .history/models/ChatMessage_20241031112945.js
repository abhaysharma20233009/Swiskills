const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
 content:{
     type:[String],
	 required:true,
 },
 status: {
    type: String,
    enum: ['pending', 'sent'],
    default: 'pending',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  
});

const  chatMessage= mongoose.model('chatMessage', chatMessageSchema);
module.exports = chatMessage;
