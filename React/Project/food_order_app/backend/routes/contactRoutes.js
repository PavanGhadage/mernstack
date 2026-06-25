const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

// GET ALL MESSAGES
router.get("/", async (req, res) => {
  try {
    const messages = await Contact.find();

    res.json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});

// ADD MESSAGE
router.post("/", async (req, res) => {
  try {
    const message = new Contact(req.body);

    await message.save();

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE MESSAGE
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);

    res.json({
      message: "Message Deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
