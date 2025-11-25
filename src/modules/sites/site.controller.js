const siteService = require('./site.service');
const { success } = require('../../core/responseBuilder');

const getAll = async (req, res, next) => {
    try {
        const sites = await siteService.findAll();
        return success(res, sites);
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const site = await siteService.findById(req.params.id);
        return success(res, site);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const site = await siteService.create(req.body);
        return success(res, site, 'Site created successfully', 201);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const site = await siteService.update(req.params.id, req.body);
        return success(res, site, 'Site updated successfully');
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        await siteService.remove(req.params.id);
        return success(res, null, 'Site deleted successfully');
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
