const app = require('./app');
const config = require('./config/env');
const logger = require('./core/logger');
const sequelize = require('./config/database');

const startServer = async () => {
    try {
        await sequelize.authenticate();
        logger.info('Database connection established successfully.');

        // Sync models (optional, use migrations in production)
        // await sequelize.sync(); 

        app.listen(config.port, () => {
            logger.info(`Server running on port ${config.port} in ${config.env} mode`);
        });
    } catch (err) {
        logger.error('Unable to connect to the database:', err);
        process.exit(1);
    }
};

startServer();
