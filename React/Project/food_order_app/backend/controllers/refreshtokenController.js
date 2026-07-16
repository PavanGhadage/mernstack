exports.refreshToken = (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh Token Not Found",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const accessToken = generateAccessToken({
      _id: decoded.userId,
      role: decoded.role,
    });

    res.status(200).json({
      success: true,
      accessToken,
    });
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid Refresh Token",
    });
  }
};
