'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CalibrationData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      calibration_id: {
        type: Sequelize.INTEGER
      },
      clientName: {
        type: Sequelize.STRING
      },
      clientAddress: {
        type: Sequelize.STRING
      },
      clientPhone: {
        type: Sequelize.STRING
      },
      clientEmail: {
        type: Sequelize.STRING
      },
      equipmentId: {
        type: Sequelize.STRING
      },
      equipmentManufacturer: {
        type: Sequelize.STRING
      },
      equipmentModelNumber: {
        type: Sequelize.STRING
      },
      equipmentSerialNumber: {
        type: Sequelize.STRING
      },
      equipmentTolerance: {
        type: Sequelize.STRING
      },
      unit: {
        type: Sequelize.STRING
      },
      calibrationProcedure: {
        type: Sequelize.STRING
      },
      calibrationToolId: {
        type: Sequelize.STRING
      },
      calibrationToolManufacturer: {
        type: Sequelize.STRING
      },
      calibrationToolMN: {
        type: Sequelize.STRING
      },
      calibrationToolSN: {
        type: Sequelize.STRING
      },
      setpoint1: {
        type: Sequelize.STRING
      },
      setpoint2: {
        type: Sequelize.STRING
      },
      setpoint3: {
        type: Sequelize.STRING
      },
      asLeft1: {
        type: Sequelize.STRING
      },
      asLeft2: {
        type: Sequelize.STRING
      },
      asLeft3: {
        type: Sequelize.STRING
      },
      asFound1: {
        type: Sequelize.STRING
      },
      asFound2: {
        type: Sequelize.STRING
      },
      asFound3: {
        type: Sequelize.STRING
      },
      calibrationTech: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('calibration_data');
  }
};