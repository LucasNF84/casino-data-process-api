const jwt = require('jsonwebtoken');
const User = require('./user.model');
const config = require('../../config/env');

const register = async (data) => {
    const { username, email, password, registrationCode } = data;

    // Validate registration code
    const requiredCode = config.registrationCode || 'Casino777';
    if (registrationCode !== requiredCode) {
        throw new Error('Invalid registration code');
    }

    // Check if user already exists
    const existingUser = await User.findOne({
        where: { email }
    });

    if (existingUser) {
        throw new Error('User already exists with this email');
    }

    // Create user (password will be hashed by model hook)
    const user = await User.create({
        username,
        email,
        password,
        registrationCode,
    });

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

const login = async (email, password) => {
    // Find user
    const user = await User.findOne({ where: { email } });

    if (!user) {
        throw new Error('Invalid credentials');
    }

    // Check if user is active
    if (!user.isActive) {
        throw new Error('Account is inactive');
    }

    // Verify password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new Error('Invalid credentials');
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
        throw new Error('User not found');
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
    register,
    login,
    verifyToken,
    getUserById,
};
