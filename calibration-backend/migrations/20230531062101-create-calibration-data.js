'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CalibrationData', {
      calibration_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clientName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      clientAddress: {
        type: Sequelize.STRING,
        allowNull: true
      },
      clientPhone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      clientEmail: {
        type: Sequelize.STRING,
        allowNull: true
      },
      calibrationType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      equipmentManufacturer: {
        type: Sequelize.STRING,
        allowNull: true
      },
      equipmentModelNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      equipmentSerialNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      calibrationToolUsed: {
        type: Sequelize.STRING,
        allowNull: true
      },
      calibrationToolManufacturer: {
        type: Sequelize.STRING,
        allowNull: true
      },
      calibrationToolMN: {
        type: Sequelize.STRING,
        allowNull: true
      },
      calibrationToolSN: {
        type: Sequelize.STRING,
        allowNull: true
      },
      setpoint: {
        type: Sequelize.STRING,
        allowNull: true
      },
      asLeft: {
        type: Sequelize.STRING,
        allowNull: true
      },
      asFound: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CalibrationData');
  }
};