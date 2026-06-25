const mongoose = require("mongoose");

const connection = async () => {
  try {
    const result = await mongoose.connect("mongodb://localhost:27017/mydata");
  } catch (err) {
    console.log(err);
  }
};

connection();
module.exports = connection;
