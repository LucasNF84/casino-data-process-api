const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const SiteImportType = sequelize.define('SiteImportType', {
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
}, {
    schema: 'dbo',
    tableName: 'siteImportType',
    timestamps: false,
});

module.exports = SiteImportType;
