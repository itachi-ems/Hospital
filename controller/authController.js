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

  const token = signToken(newUser._id)

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
  const user = await User.findOne({ email }).select('+password');

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
