// routes/messages.js

const express = require('express');
const messagesController = require('../controllers/messagesController');
const catchAsync = require('../utils/catchAsync');

const router = express.Router();

// GET /messages
router.get('/:id', messagesController.getAllMessages);

// POST /messages
router.post('/', messagesController.createMessage);

// // PUT /messages/:id
// router.put('/:id', messagesController.updateMessage);

// // DELETE /messages/:id
// router.delete('/:id', messagesController.deleteMessage);

module.exports = router;
