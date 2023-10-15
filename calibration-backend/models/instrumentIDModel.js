const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const equipmentIDSchema = new Schema({
    equipmentName: {
        type: String,
        required: true
    },
    equipmentID: {
        type: String,
        required: true
    },
    equipmentManufacturer: {
        type: String,
        required: true
    },
    equipmentModelNumber: {
        type: String,
        required: true
    },
    equipmentSerialNumber: {
        type: String,
        required: true
    },
    equipmentRange: {
        type: String,
        required: true
    },
    equipmentUnits: {
        type: String,
        required: true
    },
    equipmentDescription: {
        type: String,
        required: true
    },
    equipmentLocation: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('InstrumentID', equipmentIDSchema);
