const mongoose = require("mongoose");

const connection = async () => {
  try {
    console.log("connecting to mongo.....");
    await mongoose.connect("mongodb://localhost:27017/backend");
    console.log("mongodb connected....");
  } catch (err) {
    console.log("error  is :");
    console.log(err.error);
  }
};

module.exports = connection;
