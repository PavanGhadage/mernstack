const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    cuisine: String,
    rating: String,
    price: String,
    deliveryTime: String,
    image: String,
    foodType: {
      type: String,
      enum: ["veg", "nonveg"],
      default: "veg",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Restaurant", RestaurantSchema);
