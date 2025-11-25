const Connection = require('./connection.model');

const findAll = async () => {
    return await Connection.findAll();
};

const create = async (data) => {
    return await Connection.create(data);
};

const update = async (id, data) => {
    const connection = await Connection.findByPk(id);
    if (!connection) {
        throw new Error('Connection not found');
    }
    return await connection.update(data);
};

module.exports = {
    findAll,
    create,
    update,
};
