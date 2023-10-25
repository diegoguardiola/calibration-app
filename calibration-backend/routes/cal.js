const express = require('express')
const {getCalibrations, addCalibrationData} = require('../controllers/calibrationDataController')
const {requireAuth} = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

router.post('/:equipmentId/add-calibration', addCalibrationData)
router.post('/get-calibrations', getCalibrations)

module.exports = router