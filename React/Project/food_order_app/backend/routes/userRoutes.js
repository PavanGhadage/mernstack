const express = require("express");
const User = require("../models/User");

const router = express.Router();
const upload = require("../middleware/upload");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");
const authorize = require("../middleware/authorize");
const {
  register,
  login,
  getalluser,
  getsingleuser,
  update,
  deletedata,
  sendOTP,
  verifyOTP,
  resetPassword,
} = require("../controllers/userController");
const cloudinary = require("../config/cloudinary");
// REGISTER USER
router.post("/register", register); // Public
router.post("/login", login); // Public

router.get("/", verifyToken, authorize("admin"), getalluser);

router.get("/:id", verifyToken, getsingleuser);

router.patch(
  "/profile/:id",
  verifyToken,
  upload.single("profileImage"),
  update,
);

router.delete("/:id", verifyToken, authorize("admin"), deletedata);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);

module.exports = router;
