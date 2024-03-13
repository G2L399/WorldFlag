"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.transaction, {
        foreignKey: 'id_transaction', 
        as: 'transaction', 
      });
      this.belongsTo(models.product, {
        foreignKey: 'id_product', 
        as: 'productAssociation',
      })
      this.belongsTo(models.user, {
        foreignKey: 'id_user', 
        as: 'user',
      })
    }
  }
  transaction_detail.init(
    {
      id_transaction_detail: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_transaction: DataTypes.INTEGER,
      id_user: DataTypes.INTEGER,
      id_product: DataTypes.INTEGER,
      product: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "transaction_detail",
      tableName: "transaction_detail", // Table name in the database
      timestamps: false, // This line disables createdAt and updatedAt columns
    }
  );
  return transaction_detail;
};