const express = require('express');
const router = express.Router();
const connectionController = require('./connection.controller');

router.get('/connections', connectionController.getAll);
router.post('/connections', connectionController.create);
router.put('/connections/:id', connectionController.update);

module.exports = router;
