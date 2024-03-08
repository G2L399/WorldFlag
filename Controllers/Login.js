const { where } = require("sequelize");
/** load model for `members` table */
const User = require(`../models/index`).user;
/** load Operation from Sequelize */
const Op = require(`sequelize`).Op;

exports.login = async (req, res, next) => {
  try {
    if (req.session.isLoggedin) {
      return res.status(400).json({
        success: false,
        error: "User is already logged in. Please sign out first.",
      });
    }
    const { Username, Password } = req.body;
    const unexpectedKeys = Object.keys(req.body).filter(
      (key) => !["Username", "Password"].includes(key)
    );
    if (unexpectedKeys.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Invalid keys: ${unexpectedKeys.join(", ")}`,
      });
    }

    const user = await User.findOne({
      where: {
        username: Username,
        password: Password,
      },
    });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid Username or Password",
      });
    } else {
      const user = await User.findOne({ where: { Username, Password } });
      req.session.isAdmin = user.isAdmin === "True";
      req.session.isLoggedin = true;
      req.session.idUser = user.id_user;
      return res.status(200).json({
        success: true,
        data: {
          id_user: user.id_user,
          username: user.username,
          user_type: user.user_type,
          admin: req.session.isAdmin,
          id: req.session.idUser
          // adminq: user.isAdmin
        },
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
exports.SignOut = async (req, res) => {
  try {
    if (!req.session.isLoggedin) {
      return res.status(400).json({
        success: false,
        error: "User is not logged in. Please sign in first.",
      });
    }
    req.session.destroy();
    return res.status(200).json({
      success: true,
      message: "You have successfully signed out",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
}