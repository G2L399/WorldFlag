/** load model for `members` table */
const User = require(`../models/index`).user;
/** load Operation from Sequelize */
const Op = require(`sequelize`).Op;
const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");
exports.SIGN_UP = async (req, res) => {
  try {
    const { username, password, user_type } = req.body;

    const unexpectedKeys = Object.keys(req.body).filter(
      (key) => !["username", "password", "user_type"].includes(key)
    );
    if (unexpectedKeys.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Invalid keys: ${unexpectedKeys.join(", ")}`,
      });
    }

    const newUser = await User.create({
      username: username,
      password: password,
      user_type: user_type,
    });
    // console.log(username);
    // console.log(password);
    // console.log(user_type);
    res.json({
      success: true,
      data: newUser,
      message: "User Inserted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
exports.DeleteAcc = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
    const user = await User.destroy({
      where: {
        username: username,
        password: password,
      },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid Username or Password",
      });
    }
    res.json({
      success: true,
      message: "User Deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
