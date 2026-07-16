const express = require("express");
const Cart = require("../models/Cart");

const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

// GET ALL CART ITEMS
router.get("/", verifyToken, async (req, res) => {
  try {
    const cartItems = await Cart.find({
      userId: req.user.userId,
    });

    res.json(cartItems);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

// ADD TO CART
router.post("/", verifyToken, async (req, res) => {
  try {
    const cartItem = new Cart({
      ...req.body,
      userId: req.user.userId,
    });

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
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Cart.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

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
