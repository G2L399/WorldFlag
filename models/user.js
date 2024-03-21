"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.transaction_detail, {
        foreignKey: 'id_user', 
        as: 'user', 
      });
      this.hasMany(models.cart_detail, {
        foreignKey: 'id_user', 
        as: 'userAlly', 
      });
      
    }
  }
  user.init(
    {
      id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      user_type: DataTypes.ENUM('Male', 'Female', 'Other'),
      balance: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "user",
      tableName: "user", // Table name in the database
      timestamps: false, // This line disables createdAt and updatedAt columns
    }
  );
  return user;
};
