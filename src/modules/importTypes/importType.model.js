const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ImportType = sequelize.define('ImportType', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'ImportTypes',
    timestamps: true,
});

module.exports = ImportType;
