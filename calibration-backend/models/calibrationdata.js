'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CalibrationData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CalibrationData.init({
    calibration_id: DataTypes.INTEGER,
    clientName: DataTypes.STRING,
    clientAddress: DataTypes.STRING,
    clientPhone: DataTypes.STRING,
    clientEmail: DataTypes.STRING,
    equipmentId: DataTypes.STRING,
    equipmentManufacturer: DataTypes.STRING,
    equipmentModelNumber: DataTypes.STRING,
    equipmentSerialNumber: DataTypes.STRING,
    equipmentTolerance: DataTypes.STRING,
    unit: DataTypes.STRING,
    calibrationProcedure: DataTypes.STRING,
    calibrationToolId: DataTypes.STRING,
    calibrationToolManufacturer: DataTypes.STRING,
    calibrationToolMN: DataTypes.STRING,
    calibrationToolSN: DataTypes.STRING,
    setpoint1: DataTypes.STRING,
    setpoint2: DataTypes.STRING,
    setpoint3: DataTypes.STRING,
    asLeft1: DataTypes.STRING,
    asLeft2: DataTypes.STRING,
    asLeft3: DataTypes.STRING,
    asFound1: DataTypes.STRING,
    asFound2: DataTypes.STRING,
    asFound3: DataTypes.STRING,
    calibrationTech: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CalibrationData',
  });
  return CalibrationData;
};