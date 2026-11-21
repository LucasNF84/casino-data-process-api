const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Site = sequelize.define('Site', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    businessKey: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    regionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('GETDATE()'),
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    schema: 'dw',
    tableName: 'site',
    timestamps: false,
});

module.exports = Site;
