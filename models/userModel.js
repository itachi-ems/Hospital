const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Auser must have a name"],
  },
  email: {
    type: String,
    required: [true, "A user must have an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Auser must have a password"],
    minlength: 8,
    //Never show in output
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    //This only works on CREATE() & SAVE()
    validate: function (el) {
      return el === this.password;
    },
    message: "Passwords do not match",
  },
});

userSchema.pre("save", async function (next) {
  //Only run if password modified
  if (!this.isModified("password")) return next;

  //Hash the Password
  this.password = await bcrypt.hash(this.password, 12);

  //Delete confirmPassword FIELD
  this.confirmPassword = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
    return await bcrypt.compare(candidatePassword,userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;