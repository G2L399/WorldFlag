'use strict';
const sequelize = require('sequelize')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "user",
      {
        id_user: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        username: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        user_type: {
          type: Sequelize.ENUM("Male", "Female", "Other"),
          allowNull: false,
        },
        isAdmin: {
          type: Sequelize.ENUM("True", "False"),
          allowNull: false,
          defaultValue: "False",
        },
        balance: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("admin");
  },
};
