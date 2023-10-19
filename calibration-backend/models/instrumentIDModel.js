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
    instrumentManufacturer: {
        type: String,
        required: true
    },
    instrumentModelNumber: {
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
    instrumentIntervalYears: {
        type: Number,
        required: true
    },
    instrumentIntervalMonths: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('InstrumentID', instrumentIDSchema);