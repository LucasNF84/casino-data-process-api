const express = require('express');
const router = express.Router();
const systemController = require('./system.controller');

router.get('/systems', systemController.getAll);
router.post('/systems', systemController.create);
router.delete('/systems/:id', systemController.remove);

module.exports = router;
