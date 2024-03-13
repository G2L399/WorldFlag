"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.cart_detail, {
        foreignKey: 'id_cart', 
        as: 'cart', 
      });
    }
  }
  cart.init(
    {
      id_cart: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user: DataTypes.STRING,
      product: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "cart",
      tableName: "cart", // Table name in the database
      timestamps: false, // This line disables createdAt and updatedAt columns
    }
  );
  return cart;
};
