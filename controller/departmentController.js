const Department = require("../models/departmentModel");

//1)Create Department :
exports.createDepartment = async (req, res) => {
  try {
    const newDepartment = await Department.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        newDepartment,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err,
    });
  }
};

//2)Get All Departments :
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();

    res.status(200).json({
      status: "success",
      results: departments.length,
      data: {
        departments,
      },
    });
  } catch (err) {
    res.status(200).json({
      status: "fail",
      message: err,
    });
  }
};

//3)Get Department by ID :
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    res.status(400).json({
      status: "success",
      data: {
        department,
      },
    });
  } catch (err) {
    res.status(200).json({
      status: "fail",
      message: err,
    });
  }
};

//4)Update Department By Id :
exports.updateDepartmentById=async(req,res)=>{
  try{
    const department = await Department.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
    res.status(400).json({
      status: "success",
      data: {
        department,
      },
    });
  }
  catch(err){
    res.status(200).json({
      status: "fail",
      message: err,
    });
  }
}

//5)Delete Department By Id :
exports.deleteDepartmentById = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    res
      .status(400)
      .json({ status: "success", message: "Department deleted successfully" });
  } catch (err) {
    res.status(200).json({ status: "fail", message: err });
  }
};
