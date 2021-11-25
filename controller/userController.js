const User = require('../models/userModel');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) =>{
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)) newObj[el] = obj[el]
    });
    return newObj;
    
}

exports.getAllUsers =async(req,res,next) =>{
    const users =await User.find();

    res.status(200).json({
        status:'success',
        results:users.length,
        data:{
            users
        }
    })
}
exports.getUser=(req,res,next)=>{
    res.status(200).json({
        status:'success',
        message:'this route is not yet defined'
    })
}

exports.deleteUser=(req,res,next)=>{
    res.status(200).json({
        status:'success',
        message:'this route is not yet defined'
    })
}

exports.updateMe=async(req,res,next)=>{
    //1)create Error if user POSTS password data
    if(req.body.password || req.body.confirmPassword){
        return next(new AppError('This route is not for update PASSWORD.Please Try Something else',404))
    }

    //2)Update User document

    const filterBody = filterObj(req.body, 'name', 'email' );
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filterBody, {new:true,runValidators:true})

    res.status(200).json({
        status:"success",
        message:"User updated successfully",
        data:{
            user:updatedUser
        }
    })
}

exports.deleteMe = async(req,res,next) =>{
    await User.findByIdAndUpdate(req.user.id, {active:false});

    res.status(204).json({
        status:'success',
        message:'User removed successfully',
        
    })
}