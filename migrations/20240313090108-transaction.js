"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("transaction", {
      id_transaction: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      metode_pembayaran: {
        type: Sequelize.ENUM("Credit Card", "Debit Card", "Balance"),
        allowNull: false,
      },
      user: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      paid: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      kembalian: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      purchased: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      catatan: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: "'-'",
      },
      status: {
        type: Sequelize.ENUM("completed", "pending"),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("transaction");
  },
};
