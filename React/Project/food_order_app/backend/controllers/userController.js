const User = require("../models/User");
const bcrypt = require("bcrypt");
const cloudinary = require("../config/cloudinary");

const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      mobile,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({
      message: "User Registered Successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }
    console.log("JWT Secret:", process.env.JWT_SECRET);
    const accessToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(200).json({
      message: "Login Successful",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getalluser = async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

exports.getsingleuser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.update = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
    if (req.user.userId !== req.params.id && req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this profile",
      });
    }

    // Update Name
    if (req.body.name) {
      user.name = req.body.name;
    }

    // Update Mobile
    if (req.body.mobile) {
      user.mobile = req.body.mobile;
    }

    // Delete Profile Image
    if (req.body.profileImage === "") {
      if (user.profileImage) {
        const publicId = user.profileImage
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];

        await cloudinary.uploader.destroy(publicId);
      }

      user.profileImage = "";
    }

    // Upload New Profile Image
    if (req.file) {
      // Delete old image first
      if (user.profileImage) {
        const publicId = user.profileImage
          .split("/")
          .slice(-2)
          .join("/")
          .split(".")[0];

        await cloudinary.uploader.destroy(publicId);
      }

      user.profileImage = req.file.path;
    }

    await user.save();

    res.json(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.deletedata = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User Deleted",
    });
  } catch (error) {
    console.log(error);
  }
};
