const jwt = require('jsonwebtoken');
const User = require('./user.model');
const config = require('../../config/env');

// Error con código HTTP para que el errorHandler no devuelva 500
const httpError = (statusCode, message) => {
    const err = new Error(message);
    err.statusCode = statusCode;
    return err;
};

const login = async (email, password) => {
    if (!email || !password) {
        throw httpError(400, 'email and password are required');
    }

    // Find user
    const user = await User.findOne({ where: { email } });

    if (!user) {
        throw httpError(401, 'Invalid credentials');
    }

    // Check if user is active
    if (!user.isActive) {
        throw httpError(403, 'Account is inactive');
    }

    // Verify password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw httpError(401, 'Invalid credentials');
    }

    // Generate token
    const token = generateToken(user);

    return {
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            isActive: user.isActive,
        },
        token,
    };
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        return decoded;
    } catch (error) {
        throw new Error('Invalid token');
    }
};

const getUserById = async (id) => {
    const user = await User.findByPk(id, {
        attributes: ['id', 'username', 'email', 'isActive', 'createdAt']
    });

    if (!user) {
        throw httpError(404, 'User not found');
    }

    return user;
};

// Helper function to generate JWT
const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
    };

    return jwt.sign(payload, config.jwtSecret, {
        expiresIn: config.jwtExpiresIn || '24h',
    });
};

module.exports = {
    httpError,
    login,
    verifyToken,
    getUserById,
};
