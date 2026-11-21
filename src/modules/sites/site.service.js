const { Op } = require('sequelize');
const sequelize = require('../../config/database');
const Site = require('./site.model');
const SiteConnection = require('./siteConnection.model');
const Connection = require('../connections/connection.model');
const SystemNumber = require('../systems/systemNumber.model');
const SiteImportType = require('./siteImportType.model');
const ImportType = require('../importTypes/importType.model');

const findAll = async () => {
    return await Site.findAll({
        include: [
            'Region',
            'Company',
            {
                model: SiteConnection,
                include: [
                    {
                        model: Connection,
                        attributes: ['id', 'name', 'systemId']
                    },
                    {
                        model: SystemNumber
                    }
                ]
            },
            {
                model: SiteImportType,
                include: [
                    {
                        model: ImportType
                    }
                ]
            }
        ]
    });
};

const findById = async (id, transaction = null) => {
    return await Site.findByPk(id, {
        transaction,
        include: [
            'Region',
            'Company',
            {
                model: SiteConnection,
                include: [
                    {
                        model: Connection,
                        attributes: ['id', 'name', 'systemId']
                    },
                    {
                        model: SystemNumber
                    }
                ]
            },
            {
                model: SiteImportType,
                include: [
                    {
                        model: ImportType
                    }
                ]
            }
        ]
    });
};

const create = async (data) => {
    return await sequelize.transaction(async (transaction) => {
        const { siteConnections, ...siteData } = data;

        // Remove 'id' from siteData if present to avoid identity insert errors on creation
        const { id, ...cleanSiteData } = siteData;

        const site = await Site.create(cleanSiteData, { transaction });

        if (siteConnections && siteConnections.length > 0) {
            for (const connData of siteConnections) {
                const { SystemNumbers, id: connId, ...connFields } = connData; // Exclude ID for creation
                const siteConnection = await SiteConnection.create({
                    ...connFields,
                    siteId: site.id
                }, { transaction });

                if (SystemNumbers && SystemNumbers.length > 0) {
                    const systemNumbersWithId = SystemNumbers.map(sn => {
                        const { id: snId, ...snFields } = sn; // Exclude ID for creation

                        // Sanitize importDate if present
                        if (snFields.importDate) {
                            snFields.importDate = new Date(snFields.importDate).toISOString().slice(0, 19).replace('T', ' ');
                        }

                        return {
                            ...snFields,
                            siteConnectionId: siteConnection.id
                        };
                    });
                    await SystemNumber.bulkCreate(systemNumbersWithId, { transaction });
                }
            }
        }

        return await findById(site.id, transaction);
    });
};

const update = async (id, data) => {
    return await sequelize.transaction(async (transaction) => {
        const { siteConnections, ...siteData } = data;
        const site = await Site.findByPk(id, { transaction });

        if (!site) {
            throw new Error('Site not found');
        }

        await site.update(siteData, { transaction });

        if (siteConnections) {
            // 1. Get existing SiteConnections
            const existingConnections = await SiteConnection.findAll({
                where: { siteId: id },
                include: [SystemNumber],
                transaction
            });

            // IDs of incoming connections that already exist
            const incomingConnIds = siteConnections
                .filter(sc => sc.id)
                .map(sc => sc.id);

            // 2. Delete removed SiteConnections
            const connsToDelete = existingConnections.filter(ec => !incomingConnIds.includes(ec.id));
            for (const conn of connsToDelete) {
                // Delete associated SystemNumbers first
                await SystemNumber.destroy({ where: { siteConnectionId: conn.id }, transaction });
                await conn.destroy({ transaction });
            }

            // 3. Process incoming connections (Create or Update)
            for (const connData of siteConnections) {
                const { SystemNumbers, id: connId, ...connFields } = connData;
                let siteConnection;

                if (connId) {
                    // Update existing
                    siteConnection = existingConnections.find(ec => ec.id === connId);
                    if (siteConnection) {
                        await siteConnection.update(connFields, { transaction });
                    }
                } else {
                    // Create new
                    siteConnection = await SiteConnection.create({
                        ...connFields,
                        siteId: id
                    }, { transaction });
                }

                // 4. Sync SystemNumbers if siteConnection exists
                if (siteConnection && SystemNumbers) {
                    const existingSn = await SystemNumber.findAll({
                        where: { siteConnectionId: siteConnection.id },
                        transaction
                    });

                    const incomingSnIds = SystemNumbers
                        .filter(sn => sn.id)
                        .map(sn => sn.id);

                    // Delete removed SystemNumbers
                    await SystemNumber.destroy({
                        where: {
                            siteConnectionId: siteConnection.id,
                            id: { [Op.notIn]: incomingSnIds }
                        },
                        transaction
                    });

                    // Upsert SystemNumbers
                    for (const snData of SystemNumbers) {
                        const { id: snId, ...snFields } = snData;

                        // Sanitize importDate if present
                        if (snFields.importDate) {
                            snFields.importDate = new Date(snFields.importDate).toISOString().slice(0, 19).replace('T', ' ');
                        }

                        if (snId) {
                            const snToUpdate = existingSn.find(sn => sn.id === snId);
                            if (snToUpdate) {
                                await snToUpdate.update(snFields, { transaction });
                            }
                        } else {
                            await SystemNumber.create({
                                ...snFields,
                                siteConnectionId: siteConnection.id
                            }, { transaction });
                        }
                    }
                }
            }
        }

        return await findById(id, transaction);
    });
};

const remove = async (id) => {
    const site = await Site.findByPk(id);
    if (!site) {
        throw new Error('Site not found');
    }
    return await site.destroy();
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
