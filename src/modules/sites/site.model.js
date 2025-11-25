const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Site = sequelize.define('Site', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    connectionId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Assuming nullable for now
    },
    regionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    companyId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'Sites',
    timestamps: true,
});

module.exports = Site;
