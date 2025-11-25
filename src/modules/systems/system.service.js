const System = require('./system.model');

const findAll = async () => {
    return await System.findAll();
};

const create = async (data) => {
    return await System.create(data);
};

module.exports = {
    findAll,
    create,
};
