const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
    logger.error(err.message, { stack: err.stack, url: req.originalUrl, method: req.method });

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        success: false,
        error: {
            code: statusCode,
            message: message,
        },
    });
};

module.exports = errorHandler;
