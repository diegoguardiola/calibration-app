const express = require('express')
const {
    getCalibrations,
    createCalibrationData,
} = require('../controllers/calibrationController')
const {addCalibrationData} = require('../controllers/calibrationDataController')
const {requireAuth} = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all calibration routes
router.use(requireAuth)
// GET all calibrations
router.get('/', getCalibrations)
// POST a new calibration
router.post('/', createCalibrationData)
//router.post('/add-calibration', addCalibrationData)

module.exports = router