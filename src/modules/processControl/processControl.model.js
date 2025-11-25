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
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'ProcessControl',
    timestamps: true,
});

module.exports = ProcessControl;
