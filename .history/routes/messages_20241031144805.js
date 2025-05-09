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
.put('/:messageId', messagesController.updateMessage)
.delete('/:messageId', messagesController.deleteMessage)

// // PUT /messages/:id
// router.put('/:id', messagesController.updateMessage);

// // DELETE /messages/:id
// router.delete('/:id', messagesController.deleteMessage);

module.exports = router;
