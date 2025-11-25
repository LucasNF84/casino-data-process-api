const { success } = require('../../core/responseBuilder');

const login = async (req, res, next) => {
    try {
        // Mock login implementation
        const { username, password } = req.body;
        // Logic would go here
        return success(res, { token: 'mock-jwt-token', user: { username } }, 'Login successful');
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login,
};
