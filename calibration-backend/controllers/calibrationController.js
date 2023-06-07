const mongoose = require('mongoose')
const CalibrationData = require('../models/calibrationModel')

// get all workouts
const getCalibrations = async (req, res) => {
  const user_id = req.user._id

  const calibrations = await CalibrationData.find({ user_id }).sort({ createdAt: -1 })
  
    res.status(200).json(calibrations)
  }
  
  // get a single workout

  
  
  // create new workout
  const createCalibrationData = async (req, res) => {
    const {
      calibration_id,
      clientName,
      clientAddress,
      clientPhone,
      clientEmail,
      equipmentId,
      equipmentManufacturer,
      equipmentModelNumber,
      equipmentSerialNumber,
      equipmentTolerance,
      unit,
      calibrationProcedure,
      calibrationToolId,
      calibrationToolManufacturer,
      calibrationToolMN,
      calibrationToolSN,
      setpoint1,
      setpoint2,
      setpoint3,
      asLeft1,
      asLeft2,
      asLeft3,
      asFound1,
      asFound2,
      asFound3,
      calibrationTech
    } = req.body;
    
    // add document to database
    try {
      const user_id = req.user._id
      const calibrationData = await CalibrationData.create({
        calibration_id,
        clientName,
        clientAddress,
        clientPhone,
        clientEmail,
        equipmentId,
        equipmentManufacturer,
        equipmentModelNumber,
        equipmentSerialNumber,
        equipmentTolerance,
        unit,
        calibrationProcedure,
        calibrationToolId,
        calibrationToolManufacturer,
        calibrationToolMN,
        calibrationToolSN,
        setpoint1,
        setpoint2,
        setpoint3,
        asLeft1,
        asLeft2,
        asLeft3,
        asFound1,
        asFound2,
        asFound3,
        calibrationTech
      });
      res.status(200).json(calibrationData);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  };
  
  // delete a workout

  
  // update a workout

  
  
  module.exports = {
    getCalibrations,
    createCalibrationData
  }