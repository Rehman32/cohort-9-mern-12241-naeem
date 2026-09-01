const express = require('express');
const cors = require('cors');
const pinoHttp = require('pino-http');
const logger = require('./config/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging using pino-http
app.use(pinoHttp({ logger }));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Notes App API' });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
