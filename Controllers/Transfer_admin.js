const user = require(`../models/index`).user;
const admin = require(`../models/index`).admin;

exports.transfer = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const userid = await user.findOne({ where: { id_user: id } });
    const UserUsername = userid.username;
    const UserPassword = userid.password;
    const secretkey = req.body.secret;

    if (secretkey == "WorldFlagOwnerKey") {
      if (userid.isAdmin == "True") {
        res.json({
          success: false,
          message: UserUsername + " is already an admin",
        });
      } else {
        const admintransferred = await admin.create({
          nama_admin: "Admin",
          id_user: id,
          username: UserUsername,
          password: UserPassword,
        });
        if (admintransferred) {
          const black = await userid.update({
            isAdmin: "True",
          });
        } else {
          res.json({
            success: false,
            message: "An error occurred while transferring user to admin",
          });
        }
        res.json({
          success: true,
          message: UserUsername + " Is Now An Admin",
        });
      }
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
      message: "An error occurred while transferring user to admin",
    });
  }
};
