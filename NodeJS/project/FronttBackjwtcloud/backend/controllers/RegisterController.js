const bcrypt = require("bcrypt");
const RegisterSchema = require("../models/RegisterSchema");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const alreadyExist = await RegisterSchema.findOne({ email });

    if (alreadyExist) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new RegisterSchema({
      name,
      email,
      password: hashPass,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  register,
};
