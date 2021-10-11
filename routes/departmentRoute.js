const express = require("express");
const departmentController = require("../controller/departmentController");
const router = express.Router();

router
  .route("/")
  .get(departmentController.getAllDepartments)
  .post(departmentController.createDepartment);

router
  .route("/:id")
  .get(departmentController.getDepartmentById)
  .patch(departmentController.updateDepartmentById)
  .delete(departmentController.deleteDepartmentById);

module.exports = router;
