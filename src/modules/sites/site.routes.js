const express = require('express');
const router = express.Router();
const siteController = require('./site.controller');

router.get('/sites', siteController.getAll);
router.get('/sites/:id', siteController.getById);
router.post('/sites', siteController.create);
router.put('/sites/:id', siteController.update);
router.delete('/sites/:id', siteController.remove);

module.exports = router;
