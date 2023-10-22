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

    try {
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
        console.error("Error adding instrument:", error); // Logging the error
        res.status(400).json({error: "Error adding instrument. Please try again."}); // Sending a generic error message
    }
};

const getAllInstrumentDescriptions = async (req, res) => {
    try {
        // Find all documents but project only the instrumentDescription field
        const descriptions = await InstrumentID.find({}, 'instrumentDescription instrumentID _id');
        res.json(descriptions);
        // Extract just the description values from the returned array of documents and send as response
    } catch (error) {
        console.error("Error fetching instrument descriptions:", error); // Logging the error
        res.status(500).json({error: 'Error fetching instrument descriptions'}); // Sending a generic error message
    }
}


const getInstrumentByID = async (req, res) => {
    const { id } = req.params;

    try {
        const instrumentData = await InstrumentID.findById(id);
        
        if (!instrumentData) {
            return res.status(404).json({ message: 'Instrument not found' });
        }

        res.status(200).json(instrumentData);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = { addInstrumentID, getAllInstrumentDescriptions, getInstrumentByID }
