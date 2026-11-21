const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const SystemNumber = sequelize.define('SystemNumber', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    importDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    siteConnectionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    daysBack: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    daysForward: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    schema: 'dbo',
    tableName: 'systemNumber',
    timestamps: false,
});

module.exports = SystemNumber;
