const sequelize = require('../../config/database');
const User = require('../auth/user.model');
const { httpError } = require('../auth/auth.service');

const PUBLIC_ATTRIBUTES = ['id', 'username', 'email', 'isActive', 'createdAt', 'updatedAt'];
const MIN_PASSWORD_LENGTH = 8;

const toPublic = (user) => {
    const { id, username, email, isActive, createdAt, updatedAt } = user;
    return { id, username, email, isActive, createdAt, updatedAt };
};

const validatePassword = (password) => {
    if (!password || password.length < MIN_PASSWORD_LENGTH) {
        throw httpError(400, `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`);
    }
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (email) => {
    if (!email || !EMAIL_REGEX.test(email)) {
        throw httpError(400, 'El email no tiene un formato válido');
    }
};

const findAll = async () => User.findAll({
    attributes: PUBLIC_ATTRIBUTES,
    order: [['username', 'ASC']],
});

const create = async (data) => {
    const { username, email, password } = data || {};
    if (!username || !email) {
        throw httpError(400, 'Usuario y email son obligatorios');
    }
    validateEmail(email);
    validatePassword(password);

    const user = await User.create({ username, email, password, isActive: true });
    return toPublic(user);
};

// currentUserId: el usuario logueado, para que no pueda desactivarse a sí mismo
const update = async (id, data, currentUserId) => {
    const user = await User.findByPk(id);
    if (!user) {
        throw httpError(404, 'Usuario no encontrado');
    }

    const { username, email, password, isActive } = data || {};

    if (isActive === false && Number(id) === Number(currentUserId)) {
        throw httpError(400, 'No podés desactivar tu propio usuario');
    }

    if (username !== undefined) user.username = username;
    if (email !== undefined) {
        validateEmail(email);
        user.email = email;
    }
    if (isActive !== undefined) user.isActive = isActive;
    if (password) {
        validatePassword(password);
        user.password = password; // se hashea en el hook beforeUpdate del modelo
    }
    // DATETIME de SQL Server no acepta el formato con zona horaria de Sequelize: se usa la hora del server
    user.updatedAt = sequelize.fn('GETDATE');

    await user.save();
    await user.reload({ attributes: PUBLIC_ATTRIBUTES });
    return toPublic(user);
};

module.exports = {
    findAll,
    create,
    update,
    validateEmail,
    validatePassword,
};
