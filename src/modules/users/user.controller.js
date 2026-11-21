const userService = require('./user.service');
const { success } = require('../../core/responseBuilder');

const getAll = async (req, res, next) => {
    try {
        return success(res, await userService.findAll());
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const user = await userService.create(req.body);
        return success(res, user, 'User created successfully', 201);
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const user = await userService.update(req.params.id, req.body, req.user.id);
        return success(res, user, 'User updated successfully');
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAll,
    create,
    update,
};
