const systemService = require('./system.service');
const { success } = require('../../core/responseBuilder');

const getAll = async (req, res, next) => {
    try {
        const systems = await systemService.findAll();
        return success(res, systems);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const system = await systemService.create(req.body);
        return success(res, system, 'System created successfully', 201);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    create,
};
