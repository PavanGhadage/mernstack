const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//forregisterr
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Email checking
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            success: false,
            message: "Database Error",
          });
        }

        if (result.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Email already exists",
          });
        }

        // pass hash
        const hashedPassword = await bcrypt.hash(password, 10);

        // insertuser
        db.query(
          "INSERT INTO users(name,email,password) VALUES(?,?,?)",
          [name, email, hashedPassword],
          (err, result) => {
            if (err) {
              console.log(err);

              return res.status(500).json({
                success: false,
                message: "Unable to Register",
              });
            }

            return res.status(201).json({
              success: true,
              message: "User Registered Successfully",
            });
          },
        );
      },
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
//forlogin

const login = (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter Email and Password",
      });
    }

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            success: false,
            message: "Database Error",
          });
        }

        if (result.length === 0) {
          return res.status(400).json({
            success: false,
            message: "Email not found",
          });
        }

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(400).json({
            success: false,
            message: "Incorrect Password",
          });
        }

        //tokencrete
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            role: user.role,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          },
        );

        return res.status(200).json({
          success: true,
          message: "Login Successful",
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      },
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  register,
  login,
};
