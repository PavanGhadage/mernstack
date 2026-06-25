const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();

// GET ALL CART ITEMS
router.get("/", async (req, res) => {
  try {
    const cartItems = await Cart.find();

    res.json(cartItems);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// ADD TO CART
router.post("/", async (req, res) => {
  try {
    const cartItem = new Cart(req.body);

    await cartItem.save();

    res.status(201).json(cartItem);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// DELETE CART ITEM
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      message: "Cart Item Deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;
