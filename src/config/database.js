const { Sequelize } = require('sequelize');
const config = require('./env');

const sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: 'mssql',
    dialectModule: require('tedious'),
    logging: config.env === 'development' ? console.log : false,
    // CasinoDW guarda las fechas (DATETIME) en hora de Argentina, sin zona horaria.
    // Sin esto se leían como UTC y todas las fechas se veían 3 horas atrasadas.
    timezone: '-03:00',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    dialectOptions: {
        options: {
            encrypt: false, // Set to true if using Azure
            trustServerCertificate: true, // Set to true for local dev
            useUTC: false, // interpreta los DATETIME en la zona del proceso (TZ del contenedor)
        },
    },
});

module.exports = sequelize;
