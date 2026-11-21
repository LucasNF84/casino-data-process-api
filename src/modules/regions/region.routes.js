const express = require('express');
const router = express.Router();
const regionController = require('./region.controller');

router.get('/regions', regionController.getAll);
router.get('/regions/:id', regionController.getById);
router.post('/regions', regionController.create);
router.put('/regions/:id', regionController.update);
router.delete('/regions/:id', regionController.remove);

module.exports = router;
