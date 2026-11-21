const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const SiteConnection = sequelize.define('SiteConnection', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    siteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    connectionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    schema: 'dbo',
    tableName: 'siteConnection',
    timestamps: false,
});

module.exports = SiteConnection;
