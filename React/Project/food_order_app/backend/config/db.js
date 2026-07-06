const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URL);

    console.log("✅ MongoDB Connected");
    console.log("Database:", mongoose.connection.name);
    console.log("State:", mongoose.connection.readyState);
  } catch (error) {
    console.log("MongoDB Connection Error:");
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
