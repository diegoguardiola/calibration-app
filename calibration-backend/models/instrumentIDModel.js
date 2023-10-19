const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instrumentIDSchema = new Schema({
    instrumentDescription: {
        type: String,
        required: true
    },
    instrumentID: {
        type: String,
        required: true
    },
    NISTnum: {
        type: String,
        required: true
    },
    instruemntManufacturer: {
        type: String,
        required: true
    },
    instruemntModelNumber: {
        type: String,
        required: true
    },
    instrumentSerialNumber: {
        type: String,
        required: true
    },
    instrumentCalDate: {
        type: String,
        required: true
    },
    instruemntIntervalYears: {
        type: Number,
        required: true
    },
    instruemntIntervalMonths: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('InstrumentID', instrumentIDSchema);