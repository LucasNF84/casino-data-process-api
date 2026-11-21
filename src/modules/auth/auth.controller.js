const authService = require('./auth.service');
const { success, error } = require('../../core/responseBuilder');

const register = async (req, res, next) => {
    try {
        const result = await authService.register(req.body);
        res.status(201).json(success('User registered successfully', result));
    } catch (err) {
        next(err);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.json(success('Login successful', result));
    } catch (err) {
        next(err);
    }
};

const me = async (req, res, next) => {
    try {
        const user = await authService.getUserById(req.user.id);
        res.json(success('User retrieved successfully', user));
    } catch (err) {
        next(err);
    }
};

module.exports = {
    register,
    login,
    me,
};
