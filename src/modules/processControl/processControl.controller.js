const processControlService = require('./processControl.service');
const { success } = require('../../core/responseBuilder');

const getAll = async (req, res, next) => {
    try {
        const processes = await processControlService.getProcessStatus();
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

module.exports = {
    getAll,
    getById,
};
