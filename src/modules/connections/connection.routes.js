const express = require('express');
const router = express.Router();
const connectionController = require('./connection.controller');

router.get('/connections', connectionController.getAll);
router.post('/connections', connectionController.create);
router.put('/connections/:id', connectionController.update);
router.delete('/connections/:id', connectionController.remove);

module.exports = router;
