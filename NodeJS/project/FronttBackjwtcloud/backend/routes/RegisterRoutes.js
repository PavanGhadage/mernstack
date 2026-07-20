const express = require("express");
const router = express.Router();

const { login } = require("../controllers/Logincontroller");

console.log("login =", login); // ✅ Now it's OK

router.post("/login", login);

module.exports = router;
