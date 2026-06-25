const mongoose = require("mongoose");

const empschema = new mongoose.Schema({
  studentId: String,
  name: String,
  email: String,
  phone: String,
  dob: String,
  gender: String,
  course: String,
  department: String,
  semester: String,
  address: String,
  skills: [String],
});

module.exports = mongoose.model("user", empschema);
