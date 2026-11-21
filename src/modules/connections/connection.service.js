const Connection = require('./connection.model');
const System = require('../systems/system.model');

const findAll = async () => {
    return await Connection.findAll({
        include: [
            {
                model: System,
                attributes: ['id', 'name']
            }
        ]
    });
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

const remove = async (id) => {
    const connection = await Connection.findByPk(id);
    if (!connection) {
        throw new Error('Connection not found');
    }
    return await connection.destroy();
};

module.exports = {
    findAll,
    create,
    update,
    remove,
};
