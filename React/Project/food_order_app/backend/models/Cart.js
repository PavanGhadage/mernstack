const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    foodId: String,

    name: String,
    image: String,

    foodType: {
      type: String,
      enum: ["veg", "nonveg"],
      default: "veg",
    },

    rating: String,
    cuisine: String,
    category: String,
    deliveryTime: String,
    price: String,

    qty: {
      type: Number,
      default: 1,
    },

    userEmail: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Cart", CartSchema);
