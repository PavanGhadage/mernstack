const UserSchema = require("../models/UserSchema");

exports.getalluser = async (req, res) => {
  try {
    const result = await UserSchema.find();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
      error: err.message,
    });
  }
};

exports.getuserbyid = async (req, res) => {
  try {
    const user = await UserSchema.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching user",
      error: err.message,
    });
  }
};

exports.creteuser = async (req, res) => {
  try {
    const result = new UserSchema(req.body);

    await result.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error creating user",
      error: err.message,
    });
  }
};

exports.deleteuser = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedUser = await UserSchema.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error: err.message,
    });
  }
};
exports.updatedata = async (req, res) => {
  try {
    const id = req.params.id;

    const updateUser = await UserSchema.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updateUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: err.message,
    });
  }
};
