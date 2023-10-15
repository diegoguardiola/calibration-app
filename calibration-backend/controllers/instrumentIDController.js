const mongoose = require('mongoose')
const InstrumentID = require('../models/instrumentIDModel')

const addInstrumentID = async (req, res) => {
    const {
        company, 
        equipmentName, 
        equipmentID, 
        equipmentManufacturer, 
        equipmentModelNumber,
        equipmentSerialNumber
    } = req.body

    try{
        const instrumentData = await InstrumentID.create({
            company, 
            equipmentName, 
            equipmentID, 
            equipmentManufacturer, 
            equipmentModelNumber,
            equipmentSerialNumber
        })
        res.status(200).json(instrumentData)
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { addInstrumentID }