const regionService = require('./region.service');
const { success } = require('../../core/responseBuilder');

const getAll = async (req, res, next) => {
    try {
        const regions = await regionService.findAll();
        return success(res, regions);
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const region = await regionService.findById(req.params.id);
        if (!region) {
            return res.status(404).json({ success: false, message: 'Region not found' });
        }
        return success(res, region);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const region = await regionService.create(req.body);
        return success(res, region, 'Region created successfully', 201);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const region = await regionService.update(req.params.id, req.body);
        return success(res, region, 'Region updated successfully');
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        await regionService.remove(req.params.id);
        return success(res, null, 'Region deleted successfully');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};
