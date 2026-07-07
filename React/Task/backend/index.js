require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(cors());
app.use(express.json());
const productRoutes = require("./routes/productRoutes");
app.use("/uploads", express.static("uploads"));
// API
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Backend Running Successfully",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
