const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Report Schema
const ReportSchema = new Schema({
    equipment: {
        equipmentName: String,
        equipmentID: String,
        equipmentManufacturer: String,
        equipmentModelNumber: String,
        equipmentSerialNumber: String,
        equipmentRange: String,
        equipmentUnits: String,
        equipmentDescription: String,
        equipmentLocation: String
    },
    instrument: {
        instrumentDescription: String,
        instrumentID: String,
        NISTnum: String,
        instrumentManufacturer: String,
        instrumentModelNumber: String,
        instrumentSerialNumber: String,
        instrumentCalDate: String,
        instrumentIntervalYears: String,
        instrumentIntervalMonths: String
    },
    results: {
        serviceReason: String,
        tests: [Schema.Types.Mixed], // Assuming tests is an array of objects
        asFound: String,
        asLeft: String,
        comments: String,
        calibrationTech: String,
        calDate: String,
        intervalYear: String,
        intervalMonth: String,
        temp: String,
        humidity: String
    },
    client: {
        firstName: String,
        lastName: String,
        company: String,
        address: String,
        phone: String,
        email: String
    }
});

// Create the model
const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;
