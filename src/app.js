const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');
const errorHandler = require('./core/errorHandler');
const { error } = require('./core/responseBuilder');
const defineAssociations = require('./core/associations');

const app = express();

// Initialize Associations
defineAssociations();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api', routes);

// 404 Handler
app.use((req, res, next) => {
    error(res, 'Resource not found', 404);
});

// Error Handler
app.use(errorHandler);

module.exports = app;
