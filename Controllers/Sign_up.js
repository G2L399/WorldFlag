/** load model for `members` table */
const User = require(`../models/index`).user;
/** load Operation from Sequelize */
const Op = require(`sequelize`).Op;
const { Sequelize } = require("sequelize");
const sequelize = require("sequelize");
exports.SIGN_UP = async (req, res) => {
  try {
    const { username, password, user_type, email } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ where: { username: username } });
    const existingemail = await User.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Username already exists. Please choose a different one.",
      });
    }
    if (existingemail) {
      return res.status(400).json({
        success: false,
        error: "Email already exists. Please choose a different one.",
      });
    }

    const unexpectedKeys = Object.keys(req.body).filter(
      (key) => !["username", "password", "user_type", "email"].includes(key)
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
      email: email,
    });
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
    const reset = await User.sequelize.query(
      "ALTER TABLE `user` AUTO_INCREMENT = 1"
    );
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
exports.ResetPassword = async (req, res) => {
  try {
    const { username, password, newpassword } = req.body;
    console.log(username);
    console.log(password);
    const user = await User.findOne({
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
    } else {
      const updated = await User.update(
        { password: newpassword },
        { where: { username: username, password: password } }
      );
      if (updated) {
        res.json({
          success: true,
          message: "Password Reset successfully",
        });
      } else {
        res.json({
          success: false,
          error: "Internal Server Error",
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
const pins = {};
exports.ForgotPasswordPin = async (req, res) => {
  function generatePIN() {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit PIN
  }
  const { email } = req.body;
  const pin = generatePIN();

  // Store PIN with email in the temporary data store
  pins[email] = pin;
  res.json({
    success: true,
    pin: pin,
  });
};
exports.ForgotPasswordChange = async (req, res) => {
  try {
    const email = req.body.email;
    const { pin } = req.body;
    const newPassword = req.body.newPassword;
    if (pins[email] !== pin) {
      console.log(pins);
      return res.status(400).json({ message: "Invalid PIN" });
    }

    const user = await User.findOne({ where: { email: email } });
    console.log(user.id_user);
    console.log(email);
    const userIndex = user.id_user;

    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's password (in a real application, hash the password securely)
    const updated = await User.update(
      { password: newPassword },
      { where: { id_user: userIndex } }
    );
    if (updated) {
      // Remove the used PIN
      delete pins[email];
      res.json({ message: "Password reset successfully" });
    } else {
      res.json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
exports.editprof = async (req, res) => {
  try {
    const id = req.session.idUser || req.user.id_user;
    const username = req.body.username;
    const pp = req.file.buffer;
    const gender = req.body.gender;
    const email = req.body.email;
    console.log(pp);
    const userupdated = await User.update(
      {
        username: username,
        profile_picture: pp,
        user_type: gender,
        email: email,
      },
      { where: { id_user: id } }
    );
    if (userupdated) {
      res.json({
        success: true,
        message: "User Updated successfully",
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
