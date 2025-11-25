const express = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('../core/logger');

const router = express.Router();
const modulesPath = path.join(__dirname, '../modules');

// Helper to recursively find route files
const registerRoutes = (dir) => {
    if (!fs.existsSync(dir)) {
        return;
    }

    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            registerRoutes(fullPath);
        } else if (file.endsWith('.routes.js')) {
            try {
                const routeModule = require(fullPath);
                // Assuming route files export a function that accepts the router or an express router object
                // If it exports a router directly:
                if (Object.getPrototypeOf(routeModule) === express.Router) {
                    // Extract the base path from the folder name or file name if needed, 
                    // but usually the route file defines the path. 
                    // However, to be dynamic and clean, let's assume the route module exports a router 
                    // and we mount it. 
                    // A common pattern is: router.use('/sites', siteRoutes);
                    // But since we want dynamic, we might need a convention.
                    // Let's assume the file exports the router and we mount it at the root or based on folder?
                    // The prompt says "Registrar todos los módulos dinámicamente".
                    // Let's try to just use the router.
                    router.use(routeModule);
                    logger.info(`Routes loaded from ${file}`);
                } else if (typeof routeModule === 'function') {
                    routeModule(router);
                    logger.info(`Routes loaded from ${file}`);
                }
            } catch (error) {
                logger.error(`Error loading routes from ${file}: ${error.message}`);
            }
        }
    });
};

registerRoutes(modulesPath);

module.exports = router;
