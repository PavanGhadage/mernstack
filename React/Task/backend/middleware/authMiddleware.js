const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  //getting token from header
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access Denied. No Token Provided",
    });
  }

  try {
    //for remove bearer
    const jwtToken = token.split(" ")[1];

    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = verifyToken;
