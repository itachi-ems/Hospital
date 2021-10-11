exports.getAllDepartments= (req,res) =>{
    res.status(200).json({
        status:'success',
        message:'Get all departments'
    });
};