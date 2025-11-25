const importTypeService = require('./importType.service');
const { success } = require('../../core/responseBuilder');

const getAll = async (req, res, next) => {
    try {
        const importTypes = await importTypeService.findAll();
        return success(res, importTypes);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const importType = await importTypeService.create(req.body);
        return success(res, importType, 'ImportType created successfully', 201);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const importType = await importTypeService.update(req.params.id, req.body);
        return success(res, importType, 'ImportType updated successfully');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    create,
    update,
};
