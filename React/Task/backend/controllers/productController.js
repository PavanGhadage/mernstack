const db = require("../config/db");

//addprod

const addProduct = (req, res) => {
  const { name, description, price, quantity } = req.body;

  const userId = req.user.id;

  const image = req.file ? req.file.filename : null;

  if (!name || !description || !price || !quantity) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const sql = `
    INSERT INTO products
    (name, description, price, quantity, image, user_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, description, price, quantity, image, userId],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          success: false,
          message: "Database Error",
        });
      }

      return res.status(201).json({
        success: true,
        message: "Product Added Successfully",
      });
    },
  );
};
//getallprod

const getProducts = (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    return res.status(200).json({
      success: true,
      totalProducts: result.length,
      products: result,
    });
  });
};
//getprodbyid

const getProductById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM products WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      product: result[0],
    });
  });
};
//updateprod

const updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, price, quantity } = req.body;

  const userId = req.user.id;
  const role = req.user.role;

  const image = req.file ? req.file.filename : null;

  if (!name || !description || !price || !quantity) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  let sql;
  let values;

  if (role === "admin") {
    sql = `
      UPDATE products
      SET
        name = ?,
        description = ?,
        price = ?,
        quantity = ?,
        image = IFNULL(?, image)
      WHERE id = ?
    `;

    values = [name, description, price, quantity, image, id];
  } else {
    sql = `
      UPDATE products
      SET
        name = ?,
        description = ?,
        price = ?,
        quantity = ?,
        image = IFNULL(?, image)
      WHERE id = ?
      AND user_id = ?
    `;

    values = [name, description, price, quantity, image, id, userId];
  }

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this product.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
    });
  });
};
//deleteprod

const deleteProduct = (req, res) => {
  const { id } = req.params;

  const userId = req.user.id;
  const role = req.user.role;

  let sql;
  let values;

  if (role === "admin") {
    sql = "DELETE FROM products WHERE id = ?";
    values = [id];
  } else {
    sql = "DELETE FROM products WHERE id = ? AND user_id = ?";
    values = [id, userId];
  }

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: "Database Error",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this product.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  });
};
module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
