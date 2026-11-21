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
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    schema: 'stg',
    tableName: 'importType',
    timestamps: false,
});

module.exports = ImportType;
