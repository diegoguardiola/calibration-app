const calibrations = require('express').Router()
const db = require('../models')
const { CalibrationData } = db

//Find all calibrations
calibrations.get('/', async (req, res) => {
    try {
        const foundCalibrations = await CalibrationData.findAll()
        res.status(200).json(foundCalibrations)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Find a spoeific calibration
calibrations.get('/:id', async (req, res) => {
    try {
        const foundCalibration = await CalibrationData.findOne({
            where: { calibration_id: req.params.id }
        })
        res.status(200).json(foundCalibration)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Create a calibration
calibrations.post('/', async (req, res) => {
    try {
        const newCalibration = await CalibrationData.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newCalibration})
    } catch (error) {
        res.status(500).json(error)
    }
})

//Update a calibration
calibrations.put('/:id', async (req, res) => {
    try {
        const updatedCalibration = await CalibrationData.update(req.body, {
            where: { calibration_id: req.params.id },
            returning: true
        })
        res.status(200).json(updatedCalibration)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Delete a calibration
calibrations.delete('/:id', async (req, res) => {
    try {
        await CalibrationData.destroy({
            where: { calibration_id: req.params.id }
        })
        res.status(200).json({
            message: `Successfully deleted calibration with id ${req.params.id}`
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = calibrations