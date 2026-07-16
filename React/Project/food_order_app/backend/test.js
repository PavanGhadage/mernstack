require("dotenv").config();
const mongoose = require("mongoose");

(async () => {
  try {
    console.log("Mongo URL:", process.env.MONGO_URL);

    await mongoose.connect(process.env.MONGO_URL);

    console.log("✅ Connected Successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
})();
