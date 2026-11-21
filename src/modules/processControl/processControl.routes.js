const express = require('express');
const router = express.Router();
const processControlController = require('./processControl.controller');

router.get('/process-control', processControlController.getAll);
router.get('/process-control/:id', processControlController.getById);

module.exports = router;
