const mongoose = require('mongoose')
const User = require('../models/userModel'); 
const InstrumentID = require('../models/instrumentIDModel')

const addInstrumentID = async (req, res) => {
    const {
        equipmentName, 
        equipmentID, 
        equipmentManufacturer, 
        equipmentModelNumber,
        equipmentSerialNumber,
        equipmentRange,
        equipmentUnits,
        equipmentDescription,
        equipmentLocation,
        userId  // Assume userId is passed in request to know which user to update
    } = req.body;

    try{
        const instrumentData = await InstrumentID.create({
            company, 
            equipmentName, 
            equipmentID, 
            equipmentManufacturer, 
            equipmentModelNumber,
            equipmentSerialNumber,
            equipmentRange,
            equipmentUnits,
            equipmentDescription,
            equipmentLocation
        });

        // Find the user and update their instruments array
        await User.findByIdAndUpdate(userId, {
            $push: { instruments: instrumentData._id }
        });

        res.status(200).json(instrumentData);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = { addInstrumentID }