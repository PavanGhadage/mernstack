const express = require("express");
const Order = require("../models/Order");

const router = express.Router();
const verifyToken = require("../middleware/verifyToken");

// GET ALL ORDERS

router.get("/", verifyToken, async (req, res) => {
  try {
    let orders;

    if (req.user.role === "admin") {
      orders = await Order.find();
    } else {
      orders = await Order.find({
        userId: req.user.userId,
      });
    }

    res.json(orders);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
// CREATE ORDER
router.post("/", verifyToken, async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      userId: req.user.userId,
    });

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
// UPDATE ORDER
router.patch("/:id", verifyToken, async (req, res) => {
  try {
    let updatedOrder;

    if (req.user.role === "admin") {
      updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
    } else {
      updatedOrder = await Order.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.user.userId,
        },
        req.body,
        { new: true },
      );
    }

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order Not Found",
      });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});
// DELETE ORDER
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    let deletedOrder;

    if (req.user.role === "admin") {
      deletedOrder = await Order.findByIdAndDelete(req.params.id);
    } else {
      deletedOrder = await Order.findOneAndDelete({
        _id: req.params.id,
        userId: req.user.userId,
      });
    }

    if (!deletedOrder) {
      return res.status(404).json({
        message: "Order Not Found",
      });
    }

    res.json({
      message: "Order Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

module.exports = router;
