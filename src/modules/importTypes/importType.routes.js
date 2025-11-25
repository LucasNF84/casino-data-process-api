const express = require('express');
const router = express.Router();
const importTypeController = require('./importType.controller');

router.get('/import-types', importTypeController.getAll);
router.post('/import-types', importTypeController.create);
router.put('/import-types/:id', importTypeController.update);

module.exports = router;
