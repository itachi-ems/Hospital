const express = require('express');
const departmentController = require('../controller/departmentController');
const router = express.Router();

router.route('/').get(departmentController.getAllDepartments);

module.exports=router;