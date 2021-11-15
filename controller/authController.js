const { promisify } = require("util");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    data: {
      newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1)Check if email and password are inserted
  if (!email || !password) {
    return next(new AppError("Please provide EMAIL & PASSWORD", 400));
  }

  //2)Check is user exists and password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect EMAIL or PASSWORD   "));
  }

  //3)If everything ok, send token to client

  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    data: {
      token,
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //1)Get JWT Token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in. Please LOGIN to get access", 401)
    );
  }

  //2)Verification
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //3)Check User exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError("The User belonging to this token no longer exists", 401)
    );
  }

  //4)Check User changed password after jwt issued
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed Password, Please login again!!", 401)
    );
  }
  //Access Granted to Protected Routes
  req.user=freshUser;
  next();
});

exports.restrictTo = (...roles) =>{
  return (req,res,next) =>{
    //roles ['Admin','Doctor','Patient']
    if(!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action',403))
    }
    next();
  }
}

exports.forgotPassword = (req,res,next) =>{
  //1) Get user based on posted email

  //2) Generate random reset token

  //3) Send it to user's email
}

exports.resetPassword = (req,res,next) =>{}