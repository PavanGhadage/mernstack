const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: String,
    userEmail: String,

    name: String,
    email: String,
    mobile: String,
    city: String,
    address: String,

    payment: String,

    cartItems: Array,

    total: Number,

    // Razorpay Details
    razorpayOrderId: {
      type: String,
      default: "",
    },

    razorpayPaymentId: {
      type: String,
      default: "",
    },

    razorpaySignature: {
      type: String,
      default: "",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    status: {
      type: String,
      default: "Placed",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Order", OrderSchema);
