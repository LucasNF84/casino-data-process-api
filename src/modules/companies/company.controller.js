const companyService = require('./company.service');
const { success } = require('../../core/responseBuilder');

const getAll = async (req, res, next) => {
    try {
        const companies = await companyService.findAll();
        return success(res, companies);
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const company = await companyService.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ success: false, message: 'Company not found' });
        }
        return success(res, company);
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        const company = await companyService.create(req.body);
        return success(res, company, 'Company created successfully', 201);
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const company = await companyService.update(req.params.id, req.body);
        return success(res, company, 'Company updated successfully');
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        await companyService.remove(req.params.id);
        return success(res, null, 'Company deleted successfully');
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
