const express = require("express");

const router = express.Router();

const UserSchema = require("../models/UserSchema");
const {
  getalluser,
  updatedata,
  creteuser,
  deleteuser,
  getuserbyid,
} = require("../controllers/userControllers");

// Get all users
router.get("/", getalluser);
//get users by id
router.get("/:id", getuserbyid);

// delete

router.delete("/:id", deleteuser);

//update

router.put("/:id", updatedata);

//create

router.post("/", creteuser);

module.exports = router;
