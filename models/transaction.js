"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.transaction_detail, {
        foreignKey: "id_transaction",
        as: "transaction_detail",
      });
    }
  }
  transaction.init(
    {
      id_transaction: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      metode_pembayaran: DataTypes.ENUM("Credit Card", "Debit Card", "Balance"),
      user: DataTypes.STRING,
      paid: DataTypes.INTEGER,
      kembalian: DataTypes.INTEGER,
      purchased: DataTypes.DATEONLY,
      catatan: DataTypes.TEXT,
      status: DataTypes.ENUM("completed", "pending"),
    },
    {
      sequelize,
      modelName: "transaction",
      tableName: "transaction", // Table name in the database
      timestamps: false, // This line disables createdAt and updatedAt columns
    }
  );
  return transaction;
};
