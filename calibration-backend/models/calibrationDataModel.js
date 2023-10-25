'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calibrationDataSchema = new Schema({
    serviceReason: {
        type: String,
        required: true
    },
    tests: [{
        type: {
            type: String,
            required: true
        },
        method: {
            type: String,
            required: true
        },
        unit: {
            type: String,
            required: true,
        },
        testPoints: [{
            nominal: {
                type: Number,
            },
            asFound: {
                type: Number,
            },
            asLeft: {
                type: Number,
            },
            result: {
                type: String,
            },
            min: {
                type: Number,
            },
            max: {
                type: Number,
            }
        }]
    }],
    asFound: {
        type: String
    },
    asLeft: {
        type: String
    },
    comments: {
        type: String
    },
    calibrationTech: {
        type: String
    },
    calDate: {
        type: Date
    },
    intervalYear: {
        type: Number
    },
    intervalMonth: {
        type: Number
    },
    Temp: {
        type: Number
    },
    Humidity: {
        type: Number
    },
});

module.exports = mongoose.model('AddCalibrationData', calibrationDataSchema);
