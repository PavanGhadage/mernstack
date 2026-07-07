const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminMiddleware");
const upload = require("../middleware/upload");

const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

//create
router.post("/", verifyToken, isAdmin, upload.single("image"), addProduct);

//readalll
router.get("/", verifyToken, getProducts);

//read1
router.get("/:id", verifyToken, getProductById);

//update
router.put("/:id", verifyToken, isAdmin, upload.single("image"), updateProduct);

//delete
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

module.exports = router;
