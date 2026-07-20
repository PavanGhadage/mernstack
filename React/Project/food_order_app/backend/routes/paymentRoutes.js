const express = require("express");
const router = express.Router();
console.log("✅ Payment Routes Loaded");

const {
  createOrder,
  verifyPayment,
} = require("../controllers/paymentController");

console.log({
  createOrder: typeof createOrder,
  verifyPayment: typeof verifyPayment,
});

router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);

module.exports = router;
