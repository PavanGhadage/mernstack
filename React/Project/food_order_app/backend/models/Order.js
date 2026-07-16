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
