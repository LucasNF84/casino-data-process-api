const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ProcessControl = sequelize.define('ProcessControl', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    siteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    importTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    systemNumberId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Nullable if not always linked? Diagram shows link.
    },
    dateProcess: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    referenceDate: {
        type: DataTypes.DATEONLY, // Usually reference date is just a date
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending',
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'Import', // Diagram says 'import (stg)'
    timestamps: true,
});

module.exports = ProcessControl;
