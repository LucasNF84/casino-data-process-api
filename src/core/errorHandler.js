const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
    logger.error(err.message, { stack: err.stack, url: req.originalUrl, method: req.method });

    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle Sequelize Unique Constraint Error (Duplicate Entry)
    if (err.name === 'SequelizeUniqueConstraintError') {
        statusCode = 409; // Conflict
        message = 'El registro ya existe. Verifique que los datos sean únicos.';
    }

    // Handle Sequelize Foreign Key Constraint Error
    if (err.name === 'SequelizeForeignKeyConstraintError') {
        statusCode = 409; // Conflict
        if (req.method === 'DELETE') {
            message = 'No se puede eliminar el registro porque está siendo utilizado por otra entidad.';
        } else {
            message = 'El registro relacionado no existe (ej: Región o Compañía inválida).';
        }
    }

    res.status(statusCode).json({
        success: false,
        error: {
            code: statusCode,
            message: message,
        },
    });
};

module.exports = errorHandler;
