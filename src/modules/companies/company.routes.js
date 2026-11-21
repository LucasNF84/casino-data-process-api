const express = require('express');
const router = express.Router();
const companyController = require('./company.controller');

router.get('/companies', companyController.getAll);
router.get('/companies/:id', companyController.getById);
router.post('/companies', companyController.create);
router.put('/companies/:id', companyController.update);
router.delete('/companies/:id', companyController.remove);

module.exports = router;
