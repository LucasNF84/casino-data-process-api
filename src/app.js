const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const routes = require('./routes');
const errorHandler = require('./core/errorHandler');
const { error } = require('./core/responseBuilder');
const defineAssociations = require('./core/associations');
const authMiddleware = require('./middleware/authMiddleware');

// Rutas que no requieren token. Todo lo demás bajo /api exige un JWT válido.
const PUBLIC_ROUTES = ['POST /login'];

const requireAuth = (req, res, next) => {
    if (PUBLIC_ROUTES.includes(`${req.method} ${req.path}`)) return next();
    return authMiddleware(req, res, next);
};

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
app.use('/api', requireAuth, routes);

// 404 Handler
app.use((req, res, next) => {
    error(res, 'Resource not found', 404);
});

// Error Handler
app.use(errorHandler);

module.exports = app;
