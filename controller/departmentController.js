const Department = require("../models/departmentModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');


//1)Create Department :
exports.createDepartment = catchAsync(async (req, res, next) => {
  const newDepartment = await Department.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      newDepartment,
    },
  });
});

//2)Get All Departments :
exports.getAllDepartments = catchAsync(async (req, res ,next) => {
  const departments = await Department.find();

  res.status(200).json({
    status: "success",
    results: departments.length,
    data: {
      departments,
    },
  });
});

//3)Get Department by ID :
exports.getDepartmentById = catchAsync(async (req, res,next) => {
  const department = await Department.findById(req.params.id);
  if(!department){
    return next(new AppError('Can not find department with this ID',404));
  }
  res.status(200).json({
    status: "success",
    data: {
      department,
    },
  });
});

//4)Update Department By Id :
exports.updateDepartmentById = catchAsync(async (req, res,next) => {
  const department = await Department.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if(!department){
    return next(new AppError('Cannot find department with this ID',404));
  }
  res.status(200).json({
    status: "success",
    data: {
      department,
    },
  });
});

//5)Delete Department By Id :
exports.deleteDepartmentById = catchAsync(async (req, res,next) => {
  const department = await Department.findByIdAndDelete(req.params.id);
  if(!department){
    return next(new AppError('Cannot find department with this ID',404));
  }
  res
    .status(200)
    .json({ status: "success", message: "Department deleted successfully" });
});
