const fs = require('fs');
const express = require('express');
const app = express();
const skillsRouter = require('./routes/skillsRouter');

//Body parser,reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

app.use('/api/v1/skills', skillsRouter);
module.exports = app;
