const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const System = sequelize.define('System', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    schema: 'dbo',
    tableName: 'system',
    timestamps: false,
});

module.exports = System;
