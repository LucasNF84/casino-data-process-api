const ProcessControl = require('./processControl.model');

const findAll = async () => {
    return await ProcessControl.findAll();
};

const findById = async (id) => {
    return await ProcessControl.findByPk(id);
};

const create = async (data) => {
    return await ProcessControl.create(data);
};

const update = async (id, data) => {
    const process = await ProcessControl.findByPk(id);
    if (!process) {
        throw new Error('ProcessControl not found');
    }
    return await process.update(data);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
};
