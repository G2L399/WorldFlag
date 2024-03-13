"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.transaction_detail, {
        foreignKey: 'id_product', 
        as: 'product', 
      });
      this.hasMany(models.cart_detail, {
        foreignKey: 'id_product', 
        as: 'productAlly', 
      });
    }
  }
  product.init(
    {
      id_product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      flags: DataTypes.BLOB('long'),
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      continent: DataTypes.ENUM("Asia","Europe","North America","South America","Australia","Africa","Antarctica"),
      stock:DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "product",
      tableName: "product", // Table name in the database
      timestamps: false, // This line disables createdAt and updatedAt columns
    }
  );
  return product;
};
