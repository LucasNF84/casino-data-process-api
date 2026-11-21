const Region = require('./region.model');

const findAll = async () => {
    return await Region.findAll();
};

const findById = async (id) => {
    return await Region.findByPk(id);
};

const create = async (data) => {
    return await Region.create(data);
};

const update = async (id, data) => {
    const region = await Region.findByPk(id);
    if (!region) {
        throw new Error('Region not found');
    }
    return await region.update(data);
};

const remove = async (id) => {
    const region = await Region.findByPk(id);
    if (!region) {
        throw new Error('Region not found');
    }
    return await region.destroy();
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
