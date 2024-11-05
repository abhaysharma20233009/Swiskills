// routes/messages.js
const authController = require('../controllers/authController');
const express = require('express');
const messagesController = require('../controllers/messagesController');

const router = express.Router();
router.use(authController.protect);
// GET /messages
router
.get('/:recipientId',messagesController.getAllMessages)
.post('/:recipientId', messagesController.createMessage)
.put('/:recipientId/:messageId', messagesController.updateMessage)
.delete('/:recipientId/:messageId', messagesController.deleteMessage)


module.exports = router;
