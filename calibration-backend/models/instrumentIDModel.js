const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instrumentIDSchema = new Schema({
    company: {
        type: String,
        required: true
    },
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
});

module.exports = mongoose.model('InstrumentID', instrumentIDSchema);
