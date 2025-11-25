const express = require('express');
const router = express.Router();
const processControlController = require('./processControl.controller');

router.get('/process-control', processControlController.getAll);
router.get('/process-control/:id', processControlController.getById);
router.post('/process-control', processControlController.create);
router.put('/process-control/:id', processControlController.update);

module.exports = router;
