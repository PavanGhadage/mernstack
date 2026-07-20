const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const RegisterSchema = require("../models/RegisterSchema");

const { login } = require("../controllers/Logincontroller");

router.post("/login", login);

module.exports = router;
