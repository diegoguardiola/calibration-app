const express = require('express')
const {
    getCalibrations,
    createCalibrationData,
} = require('../controllers/calibrationController')
const {requireAuth} = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all calibrations
router.get('/', getCalibrations)

// POST a new calibration
router.post('/', createCalibrationData)

module.exports = router