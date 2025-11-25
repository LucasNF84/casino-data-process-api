const connectionService = require('./connection.service');
const { success } = require('../../core/responseBuilder');

const getAll = async (req, res, next) => {
    try {
        const connections = await connectionService.findAll();
        return success(res, connections);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const connection = await connectionService.create(req.body);
        return success(res, connection, 'Connection created successfully', 201);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const connection = await connectionService.update(req.params.id, req.body);
        return success(res, connection, 'Connection updated successfully');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    create,
    update,
};
