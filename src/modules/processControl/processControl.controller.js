const processControlService = require('./processControl.service');
const { success } = require('../../core/responseBuilder');

const getAll = async (req, res, next) => {
    try {
        const processes = await processControlService.findAll();
        return success(res, processes);
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const process = await processControlService.findById(req.params.id);
        return success(res, process);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const process = await processControlService.create(req.body);
        return success(res, process, 'ProcessControl created successfully', 201);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const process = await processControlService.update(req.params.id, req.body);
        return success(res, process, 'ProcessControl updated successfully');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
};
