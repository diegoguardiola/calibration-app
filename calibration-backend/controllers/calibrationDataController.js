const CalibrationData = require('../models/calibrationDataModel');
const EquipmentID = require('../models/equipmentIDModel');

const addCalibrationData = async (req, res) => {
    try {
        const data = req.body;
        const newCalibrationData = new CalibrationData(data);
        await newCalibrationData.save();
        res.status(201).send(newCalibrationData);
    } catch (error) {
        res.status(500).send({ message: 'Error adding calibration data', error });
    }
};

module.exports = { addCalibrationData };
