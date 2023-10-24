const AddCalibrationData = require('../models/calibrationDataModel');
const EquipmentID = require('../models/equipmentIDModel');

const addCalibrationData = async (req, res) => {
    try {
        // Create a new instance of the CalibrationData model with data from the request body
        const data = req.body;
        const newCalibration = new AddCalibrationData(data);
        const savedCalibration = await newCalibration.save();
        
        res.status(201).json(savedCalibration);
    } catch (error) {
        console.error('Error saving calibration data:', error);
        res.status(500).json({ message: 'Failed to save calibration data.' });
    }
};

module.exports = { addCalibrationData };
