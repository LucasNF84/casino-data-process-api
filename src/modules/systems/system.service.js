const System = require('./system.model');
const Connection = require('../connections/connection.model');
const SiteConnection = require('../sites/siteConnection.model');
const sequelize = require('../../config/database');

const findAll = async () => {
    return await System.findAll({
        attributes: {
            include: [
                [sequelize.fn('COUNT', sequelize.fn('DISTINCT', sequelize.col('Connections.SiteConnections.siteId'))), 'sitesCount']
            ]
        },
        include: [
            {
                model: Connection,
                attributes: [],
                include: [
                    {
                        model: SiteConnection,
                        attributes: [],
                    }
                ]
            }
        ],
        group: ['System.id', 'System.name', 'System.code']
    });
};

const create = async (data) => {
    return await System.create(data);
};

const remove = async (id) => {
    const system = await System.findByPk(id);
    if (!system) {
        throw new Error('System not found');
    }
    return await system.destroy();
};

module.exports = {
    findAll,
    create,
    remove,
};
