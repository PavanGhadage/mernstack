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
    symbol: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Restaurant", RestaurantSchema);
