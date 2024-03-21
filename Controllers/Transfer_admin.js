const user = require(`../models/index`).user;
const admin = require(`../models/index`).admin;

exports.transfer = async (req, res) => {
  try {
    const AdminName = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const secretkey = req.body.secret;
    if (secretkey == "WorldFlagOwnerKey") {
      const adminadd = await admin.create({
        email: email,
        nama_admin: AdminName,
        username: username,
        password: password,
      });
      if (adminadd) {
        res.json({
          success: true,
          message: "Admin Added",
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
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      success: false,
      message: "An error occurred while transferring user to admin",
    });
  }
};
exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const adminp = await admin.findOne({ where: { id_admin: id } });
    const secretkey = req.body.secret;

    if (secretkey == "WorldFlagOwnerKey") {
        const adminDestroyed = await admin.destroy({
          where: {
            id_admin: id,
          },
        });
        if (adminDestroyed) {
          res.json({
            success: true,
            message: adminp.username + ` (${adminp.nama_admin})` +" Is no Longer An Admin",
          });
        } else {
          res.json({
            success: false,
            message: "An error occurred while removing admin",
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
      message: "Internal Server Error",
    });
  }
};
