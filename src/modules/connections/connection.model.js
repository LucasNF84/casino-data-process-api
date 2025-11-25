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
    engine: {
        type: DataTypes.STRING, // mssql, postgres, oracle, mysql
        allowNull: false,
    },
    host: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    port: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    database: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'Connections',
    timestamps: true,
});

module.exports = Connection;
