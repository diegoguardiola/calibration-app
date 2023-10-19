const mongoose = require('mongoose')
const InstrumentID = require('../models/instrumentIDModel')

const addInstrumentID = async (req, res) => {
    const {
        instrumentDescription,
        instrumentID, 
        NISTnum, 
        instrumentManufacturer,
        instrumentModelNumber,
        instrumentSerialNumber,
        instrumentCalDate,
        instrumentIntervalYears,
        instrumentIntervalMonths,
    } = req.body;

    try{
        const instrumentData = await InstrumentID.create({
            instrumentDescription,
            instrumentID, 
            NISTnum, 
            instrumentManufacturer,
            instrumentModelNumber,
            instrumentSerialNumber,
            instrumentCalDate,
            instrumentIntervalYears,
            instrumentIntervalMonths,
        });

        res.status(200).json(instrumentData);
        } catch (error) {
        res.status(400).json({error: error.message});
        }
};

module.exports = { addInstrumentID }