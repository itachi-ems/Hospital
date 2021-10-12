const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Department must have a name."],
    unique: true,
  },
  buildingNumber: {
    type: Number,
    required: [true, "A department must have a Floor Number."],
  },
  roomNumber: {
    type: Number,
    required: [true, "A department must have a room Number."],
    unique: true,
  },
  doctorsAvailable: {
    type: Number,
  },
  fees: {
    type: Number,
    required: [true, "A department should have fees per visit."],
  },
});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
