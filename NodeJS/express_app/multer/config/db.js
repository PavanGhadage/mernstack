const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/file");

    console.log("connection successfull");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connection;
