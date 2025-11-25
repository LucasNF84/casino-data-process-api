const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Connection = sequelize.define('Connection', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    systemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dbhost: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dbname: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dbuser: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dbpassword: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dbport: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    apiuser: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    apipassword: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    apibase_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'Connection',
    timestamps: true,
});

module.exports = Connection;
