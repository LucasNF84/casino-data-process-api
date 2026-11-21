const express = require('express');
const router = express.Router();
const userController = require('./user.controller');

// Requieren login (ver requireAuth en app.js). No hay DELETE: los usuarios se desactivan.
router.get('/users', userController.getAll);
router.post('/users', userController.create);
router.put('/users/:id', userController.update);

module.exports = router;
