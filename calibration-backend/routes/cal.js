const express = require('express')
const { addCalibrationData} = require('../controllers/calibrationDataController')

const router = express.Router()

router.post('/:equipmentId/add-calibration', addCalibrationData)

module.exports = router