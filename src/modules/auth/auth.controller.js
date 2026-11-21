const authService = require('./auth.service');
const { success } = require('../../core/responseBuilder');

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        return success(res, result, 'Login successful');
    } catch (err) {
        next(err);
    }
};

const me = async (req, res, next) => {
    try {
        const user = await authService.getUserById(req.user.id);
        return success(res, user, 'User retrieved successfully');
    } catch (err) {
        next(err);
    }
};

module.exports = {
    login,
    me,
};
