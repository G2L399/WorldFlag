"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany = (models.user,{
        foreignKey: 'id_user',
        as: 'user'
      })
    }
  }
  admin.init(
    {
      id_admin: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nama_admin: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "admin",
      tableName: "admin", // Table name in the database
      timestamps: false, // This line disables createdAt and updatedAt columns
    }
  );
  return admin;
};
