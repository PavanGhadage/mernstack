const express = require("express");
const User = require("../models/User");

const router = express.Router();
const upload = require("../middleware/upload");
// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { name, email, mobile, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User Already Exists",
      });
    }

    const newUser = new User({
      name,
      email,
      mobile,
      password,
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
});

// LOGIN USER
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({
//       email,
//       password,
//     });

//     if (!user) {
//       return res.status(400).json({
//         message: "Invalid Email or Password",
//       });
//     }

//     res.json(user);
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       message: "Server Error",
//     });
//   }
// });
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login Request:", req.body);
    const users = await User.find();

    console.log(users);

    const user = await User.findOne({ email, password });

    console.log("Found User:", user);

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email or Password",
      });
    }

    res.json(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

// GET SINGLE USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

// UPDATE USER
// UPDATE PROFILE IMAGE
// UPDATE PROFILE IMAGE
const cloudinary = require("../config/cloudinary");

// UPDATE PROFILE
router.patch(
  "/profile/:id",
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({
          message: "User Not Found",
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
  },
);

// DELETE USER
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User Deleted",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
