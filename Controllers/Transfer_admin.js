const user = require(`../models/index`).user;
const admin = require(`../models/index`).admin;

exports.transfer = async (req, res) => {
  try {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const gender = req.body.gender;
    const secretkey = req.body.secret;
    const exist = await user.findOne({ where: { email: email } });
    if (!exist) {
      if (secretkey == "WorldFlagOwnerKey") {
        const pp = req.file;
        const admin1 = await user.findOne({ where: {id_user:1}})
        const adminadd = await user.create({
          profile_picture: pp,
          email: email,
          username: username,
          password: password,
          gender: gender,
          isAdmin: "True"
        });
        if (adminadd) {
          res.json({
            success: true,
            message: "Admin Added",adminadd
          });
        } else {
          res.json({
            success: false,
            message: "An error occurred while adding admin",
          });
        }
      } else {
        res.json({
          success: false,
          message: "Invalid key",
        });
      }
    } else {
      res.json({
        success: false,
        message: "Admin Exists!",
      });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      success: false,
      message: "An error occurred while making admin",
    });
  }
};
exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const secretkey = req.body.secret;
    const userprofile = await user.findOne({ where: { id_user: id } });

    if (secretkey == "WorldFlagOwnerKey") {
      const Destroyed = await user.destroy({
        where: {
          id_user: id,
        },
      });
      res.json({
        success: true,
        message: "Admin Deleted",
      });
    } else {
      res.json({
        success: false,
        message: "Invalid key",
      });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
