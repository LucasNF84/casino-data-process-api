const Company = require('./company.model');

const findAll = async () => {
    return await Company.findAll();
};

const findById = async (id) => {
    return await Company.findByPk(id);
};

const create = async (data) => {
    return await Company.create(data);
};

const update = async (id, data) => {
    const company = await Company.findByPk(id);
    if (!company) {
        throw new Error('Company not found');
    }
    return await company.update(data);
};

const remove = async (id) => {
    const company = await Company.findByPk(id);
    if (!company) {
        throw new Error('Company not found');
    }
    return await company.destroy();
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
};
