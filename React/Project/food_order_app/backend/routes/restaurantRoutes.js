const express = require("express");
const Restaurant = require("../models/Restaurant");

const router = express.Router();

// GET ALL
router.get("/", async (req, res) => {
  const restaurants = await Restaurant.find();

  res.json(restaurants);
});

// ADD
router.post("/", async (req, res) => {
  const restaurant = new Restaurant(req.body);

  await restaurant.save();

  res.status(201).json(restaurant);
});

// UPDATE
router.patch("/:id", async (req, res) => {
  try {
    console.log("PATCH ID:", req.params.id);

    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    console.log("FOUND:", restaurant);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant Not Found",
      });
    }

    res.json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant Not Found",
      });
    }

    res.json(restaurant);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});
// DELETE
router.delete("/:id", async (req, res) => {
  try {
    console.log("DELETE ID:", req.params.id);

    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

    console.log("FOUND:", restaurant);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant Not Found",
      });
    }

    res.json({
      message: "Restaurant Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
