const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');  // Express app
const setupSocket = require('./websocket/websocket');  // WebSocket setup

// Load environment variables
dotenv.config({ path: './config.env' });

// Database connection
if (!process.env.DATABASE) {
    throw new Error('DATABASE environment variable is not defined');
}

const DB = process.env.DATABASE.replace(
    '<DATABASE_PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, { useNewUrlParser: true }).then(() => {
    console.log('DB connection successful!');
});

// Create the HTTP server for API
const apiServer = http.createServer(app);

// WebSocket server on a separate port (9000)
const ioServer = http.createServer();
setupSocket(ioServer);  // Set up WebSocket for communication

// Start the HTTP server (API server)
const apiPort = process.env.API_PORT || 3000;
apiServer.listen(apiPort, () => {
    console.log(`API Server running on port ${apiPort}`);
});

// Start WebSocket server
const wsPort = process.env.WS_PORT || 9000;
ioServer.listen(wsPort, () => {
    console.log(`WebSocket Server running on port ${wsPort}`);
});
