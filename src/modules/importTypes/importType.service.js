const ImportType = require('./importType.model');

const findAll = async () => {
    return await ImportType.findAll();
};

const create = async (data) => {
    return await ImportType.create(data);
};

const update = async (id, data) => {
    const importType = await ImportType.findByPk(id);
    if (!importType) {
        throw new Error('ImportType not found');
    }
    return await importType.update(data);
};

module.exports = {
    findAll,
    create,
    update,
};
