const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "admin", "restaurant"],
      default: "user",
    },

    profileImage: {
      type: String,
      default: "",
    },

    // Forgot Password OTP
    otp: {
      type: String,
      default: "",
    },

    otpExpire: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", UserSchema);
