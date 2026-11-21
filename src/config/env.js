const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 1433,
    name: process.env.DB_NAME || 'CasinoDW',
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASS || 'your_password',
  },
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
};

// Sin secreto propio cualquiera podría firmar tokens válidos: no se arranca.
if (!module.exports.jwtSecret || module.exports.jwtSecret.length < 32) {
  throw new Error('JWT_SECRET no está definido en el .env o tiene menos de 32 caracteres');
}
