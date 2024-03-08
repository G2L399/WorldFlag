"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cart_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cart_detail.init(
    {
      id_cart_detail: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_cart: DataTypes.INTEGER,
      id_product: DataTypes.INTEGER,
      id_user: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "cart_detail",
      tableName: "cart_detail", // Table name in the database
      timestamps: false, // This line disables createdAt and updatedAt columns
    }
  );
  return cart_detail;
};
