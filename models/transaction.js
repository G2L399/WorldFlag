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
      models.transaction.hasMany(models.transaction_detail, {
        foreignKey: 'id_transaction', // Foreign key in transaction_detail table
        as: 'transaction_detail', // Alias for the association
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
      metode_pembayaran: DataTypes.ENUM('Credit Card','Debit Card','Balance'),
      user: DataTypes.STRING,
      paid: DataTypes.INTEGER,
      kembalian:DataTypes.INTEGER,
      catatan: DataTypes.TEXT,
      status: DataTypes.ENUM('completed','pending')
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
