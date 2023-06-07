'use strict';
const mongoose = require('mongoose');

const CalibrationDataSchema = new mongoose.Schema({
  calibration_id: Number,
  clientName: String,
  clientAddress: String,
  clientPhone: String,
  clientEmail: String,
  equipmentId: String,
  equipmentManufacturer: String,
  equipmentModelNumber: String,
  equipmentSerialNumber: String,
  equipmentTolerance: String,
  unit: String,
  calibrationProcedure: String,
  calibrationToolId: String,
  calibrationToolManufacturer: String,
  calibrationToolMN: String,
  calibrationToolSN: String,
  setpoint1: String,
  setpoint2: String,
  setpoint3: String,
  asLeft1: String,
  asLeft2: String,
  asLeft3: String,
  asFound1: String,
  asFound2: String,
  asFound3: String,
  calibrationTech: String,
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

const CalibrationData = mongoose.model('CalibrationData', CalibrationDataSchema);
module.exports = CalibrationData;
