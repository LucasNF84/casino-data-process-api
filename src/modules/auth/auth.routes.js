const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');

// No hay registro público: los usuarios se dan de alta desde /users (logueado)
// o con el script src/scripts/createUser.js
router.post('/login', authController.login);
router.get('/me', authController.me);

module.exports = router;
