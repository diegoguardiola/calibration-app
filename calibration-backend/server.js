// DEPENDENCIES
const express = require('express')
const app = express()
const { Sequelize } = require('sequelize')
const calibrationsController = require('./controllers/calibrationdata')

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the calibrations API'
    })
})

// CONTROLLERS
app.use('/calibrations', calibrationsController)

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`Running port: ${process.env.PORT}`)
})