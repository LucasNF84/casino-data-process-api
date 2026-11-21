const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Region = sequelize.define('Region', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    businessKey: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    schema: 'dw',
    tableName: 'region',
    schema: 'dw',
    tableName: 'region',
    timestamps: false,
});

module.exports = Region;
