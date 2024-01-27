const { where } = require("sequelize");

/** load model for `members` table */
const User = require(`../models/index`).user;
/** load Operation from Sequelize */
const Op = require(`sequelize`).Op;

exports.login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        where: {
          username: username,
          password: password,
        },
      });
      console.log(username);
      console.log(password);
      if (!user) {
        return res.status(401).json({
          success: false,
          error: "Invalid Username or Password",
        });
      }
      else {
        return res.status(200).json({
          success: true,
          data: {
            id_user:user.id_user,
            username:user.username,
            user_type:user.user_type,
          }
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: "Internal Server Error",
      });
    }
}