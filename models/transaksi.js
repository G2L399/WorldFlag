"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  transaksi.init(
    {
      id_transaksi: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      metode_pembayaran: DataTypes.ENUM('Credit Card','Card','Insurance'),
      jumlah_pembayaran: DataTypes.DECIMAL(10,2),
      catatan: DataTypes.TEXT,
      status: DataTypes.ENUM('Completed','Pending')
    },
    {
      sequelize,
      modelName: "transaksi",
      tableName: "transaksi", // Table name in the database
      timestamps: false, // This line disables createdAt and updatedAt columns
    }
  );
  return transaksi;
};
