const Site = require('./site.model');

const findAll = async () => {
    return await Site.findAll();
};

const findById = async (id) => {
    return await Site.findByPk(id);
};

const create = async (data) => {
    return await Site.create(data);
};

const update = async (id, data) => {
    const site = await Site.findByPk(id);
    if (!site) {
        throw new Error('Site not found');
    }
    return await site.update(data);
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
