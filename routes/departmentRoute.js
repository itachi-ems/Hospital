const express = require("express");
const departmentController = require("../controller/departmentController");
const authController=require('../controller/authController');

const router = express.Router();

router
  .route("/")
  .get(authController.protect,departmentController.getAllDepartments)
  .post(departmentController.createDepartment);

router
  .route("/:id")
  .get(departmentController.getDepartmentById)
  .patch(departmentController.updateDepartmentById)
  .delete(authController.protect,authController.restrictTo('Admin'),departmentController.deleteDepartmentById);

module.exports = router;
