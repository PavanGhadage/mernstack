const express = require("express");
const cors = require("cors");

require("dotenv").config();
console.log("Loaded MONGO_URL =", process.env.MONGO_URL);
console.log("All ENV =", process.env);

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const contactRoutes = require("./routes/contactRoutes");
const cloudinary = require("./config/cloudinary");
console.log(cloudinary.config());
const app = express();

// CONNECT MONGODB
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Foodie Express Backend Running");
});

app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/contact", contactRoutes);
console.log(process.env.CLOUDINARY_CLOUD_NAME);
const PORT = process.env.PORT || 5000;
const HOST = "127.0.0.1";

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
