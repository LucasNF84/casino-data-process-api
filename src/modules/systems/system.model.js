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
    systemCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'Systems',
    timestamps: true,
});

module.exports = System;
