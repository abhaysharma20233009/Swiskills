const express = require('express');
const app = express();
const http = require('http');
const socketIo = require('socket.io');
const websocket = http.createServer(app);
const cors = require('cors');
const mongoose = require('mongoose');
const messagesController = require('../controllers/messagesController'); 
const notificationController = require('../controllers/notificationController'); 
const io = socketIo(websocket, {
  cors: {
    origin: "http://127.0.0.1:5500", // Allow your frontend URL
    methods: ["GET", "POST","PUT","DELETE"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

io.on('connection', (socket) => {
    // trace the connection with a user if connected or disconnected 
    console.log('A user connected');
  //jinRoom for sender and receiver and retrieving conversation history 
    socket.on('joinRoom', async ({ senderId, recipientId }) => {
        const roomId = `${senderId}-${recipientId}`;
        socket.join(roomId);

        try {
            // Fake `req` object to retrieve conversation
            const req = {
                user: { _id: senderId }, // Ensure _id is correct
          params: { recipientId },
          io: io,
            };
            const conversation = await messagesController.getAllMessages(req);
            socket.emit('conversationHistory', conversation.messages);
           
        } catch (error) {
            console.error("Error loading conversation history:", error);
            socket.emit('messageError', { message: "Could not load conversation history." });
        }
    });
    socket.on('sendMessage', async (data) => {
      const { senderId, recipientId, content } = data;
  
      // Create a fake req object
      const req = {
          user: { _id: senderId }, // Ensure _id is correct
          body: { content },
          params: { recipientId },
          io: io,
      };
  
      try {
          const response = await messagesController.createMessage(io)(req);
          await notificationController.createNotification(io)(req);
          if (!response || !response.chat) {
              throw new Error('No chat data returned'); // More explicit error handling
          }
  
       
      } catch (error) {
          console.error("Error in socket sendMessage:", error);
          socket.emit('messageError', { message: error.message });
      }
  });
  
  socket.on('updateMessage', async (data) => {
    const { senderId, recipientId,messageId, content } = data;

    // Create a fake req object
    const req = {
        user: { _id: senderId }, // Ensure _id is correct
        body: { content },
        params: { recipientId,messageId },
        io: io,
    };

    try {
        const response = await messagesController.updateMessage(io)(req);
        if (!response || !response.chat) {
            throw new Error('No chat data returned'); // More explicit error handling
        }
   
    } catch (error) {
        console.error("Error in socket updateMessage:", error);
        socket.emit('messageError', { message: error.message });
    }
});

socket.on('deleteMessage', async (data) => {
    const { senderId, recipientId,messageId, content } = data;

    // Create a fake req object
    const req = {
        user: { _id: senderId }, // Ensure _id is correct
        body: { content },
        params: { recipientId,messageId },
        io: io,
    };

    try {
        const response = await messagesController.deleteMessage(io)(req);
        if (!response || !response.chat) {
            throw new Error('No chat data returned'); // More explicit error handling
        }
    } catch (error) {
        console.error("Error in socket updateMessage:", error);
        socket.emit('messageError', { message: error.message });
    }
});
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  module.exports=websocket;
  