const mongoose = require("mongoose");

const connection = async () => {
  try {
    const result = await mongoose.connect("mongodb://localhost:27017/RPM");
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
  }
};
connection();

module.exports = connection;
