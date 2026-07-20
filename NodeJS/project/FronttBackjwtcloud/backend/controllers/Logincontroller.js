const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const RegisterSchema = require("../models/RegisterSchema");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await RegisterSchema.findOne({ email });

    if (!findUser) {
      return res.status(400).json({
        message: "User does not exist",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, findUser.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Password does not match",
        success: false,
      });
    }

    const user = {
      _id: findUser._id,
      name: findUser.name,
      email: findUser.email,
    };

    return res.status(200).json({
      message: "Logged in successfully",
      success: true,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
