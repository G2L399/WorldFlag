const { where } = require("sequelize");

/** load model for `members` table */
const FlagsModel = require(`../models/index`).product;
/** load Operation from Sequelize */
const Op = require(`sequelize`).Op;
/** create function for read all data */
const multer = require(`multer`);
const storage = multer.memoryStorage(); // Store files in memory (you can configure it to store in disk)
const upload = multer({ storage: storage });

exports.GetFlags = async (request, response) => {
  /** call findAll() to get all data */
  let Flags = await FlagsModel.findAll();
  return response.json({
    success: true,
    data: Flags,
    message: `All Members have been loaded`,
  });
};
exports.GetFlagsByID = async (request, response) => {
  /** call findAll() to get all data */
  let id_flag = request.params.id;
  let Flags = await FlagsModel.findOne({
    where: {
      id_product: id_flag,
    },
  });
  return response.json({
    success: true,
    data: Flags,
    message: ` Have Been Loaded`,
  });
};
exports.InsertFlag = async (req, res) => {
  try {
    const { Name, Price } = req.body;
    const imageBuffer = req.file.buffer;
    const newFlag = await FlagsModel.create({
      flags: imageBuffer,
      name: Name,
      price: Price,
    });
    res.json({
      success: true,
      message: "Flag Inserted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
exports.DeleteFlag = async (req, res) => {
  try {
    const ID = req.params.id;
    const result = await FlagsModel.destroy({ where: { id_product: ID } });
    await FlagsModel.sequelize.query(
      "ALTER TABLE `product` AUTO_INCREMENT = 1"
    );
    if (result === 0) {
      // The destroy method returns the number of affected rows, so if it's 0, the record was not found.
      res.status(404).json({
        success: false,
        message: `Flag with ID ${ID} not found`,
      });
      return;
    }

    res.json({
      success: true,
      message: `Flag with ID ${ID} deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
exports.DeleteAllFlag = async (req, res) => {
  try {
    const result = await FlagsModel.destroy({ truncate: true });
    await FlagsModel.sequelize.query(
      "ALTER TABLE `product` AUTO_INCREMENT = 1"
    );
    console.log(result);
    if (result ===0) {
      // The destroy method returns the number of affected rows, so if it's 0, the record was not found.
      res.json({
        success: true,
        message: `All Flags Deleted Successfully`,
      });
      return;
    }
    // res.status(200).json({
    //   success: false,
    //   message: `No Flag found`,
    // });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
exports.UpdateFlag = async (req, res) => {
  try {
    const { Name, Price } = req.body; // Assuming you also send the ID in the request body
    const id = req.params.id;

    const imageBuffer = req.file.buffer;

    // Check if the record with the given ID existsxa
    const existingFlag = await FlagsModel.findByPk(id);

    if (!existingFlag) {
      return res.status(404).json({
        success: false,
        message: `Flag with ID ${id} not found`,
      });
    }

    // Update the existing record
    await existingFlag.update({
      flags: imageBuffer,
      name: Name,
      price: Price,
    });

    res.json({
      success: true,
      message: `Flag with ID ${id} updated successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};
