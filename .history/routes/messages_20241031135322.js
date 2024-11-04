// routes/messages.js
const authController = require('../controllers/authController');
const express = require('express');
const messagesController = require('../controllers/messagesController');

const router = express.Router();
router.use(authController.protect);
// GET /messages
router
.get('/',messagesController.getAllMessages)
.post('/', messagesController.createMessage)

// // PUT /messages/:id
// router.put('/:id', messagesController.updateMessage);

// // DELETE /messages/:id
// router.delete('/:id', messagesController.deleteMessage);

module.exports = router;
