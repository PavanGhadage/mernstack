const express = require("express");
const Restaurant = require("../models/Restaurant");

const router = express.Router();
const upload = require("../middleware/upload");

// GET ALL
router.get("/", async (req, res) => {
  const restaurants = await Restaurant.find();

  res.json(restaurants);
});

// ADD
// ADD RESTAURANT
router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);
    const image = req.file ? req.file.path : "";

    const restaurant = new Restaurant({
      name: req.body.name,
      category: req.body.category,
      cuisine: req.body.cuisine,
      rating: req.body.rating,
      price: req.body.price,
      deliveryTime: req.body.deliveryTime,

      image,

      foodType: req.body.foodType,
    });

    await restaurant.save();

    res.status(201).json(restaurant);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
      error,
    });
  }
});
// UPDATE
router.patch("/:id", upload.single("image"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const updateData = {
      ...req.body,
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    console.log("UPDATE DATA:", updateData);

    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    );

    console.log("UPDATED:", restaurant);

    res.json(restaurant);
  } catch (error) {
    console.log(error);
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
