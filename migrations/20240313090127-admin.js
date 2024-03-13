'use strict';
const sequelize = require('sequelize')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "admin",
      {
        id_admin: {
          autoIncrement: true,
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        nama_admin: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        id_user: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "user",
            key: "id_user",
          },
          unique: "admin_ibfk_1",
        },
        username: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        password: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
      },
      // {
      //   sequelize,
      //   tableName: "admin",
      //   timestamps: false,
      //   indexes: [
      //     {
      //       name: "PRIMARY",
      //       unique: true,
      //       using: "BTREE",
      //       fields: [{ name: "id_admin" }],
      //     },
      //     {
      //       name: "id_user",
      //       unique: true,
      //       using: "BTREE",
      //       fields: [{ name: "id_user" }],
      //     },
      //   ],
      // }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("admin");
  },
};
