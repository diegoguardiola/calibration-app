// DEPENDENCIES
const express = require('express')
const app = express()
const { Sequelize } = require('sequelize')
const calibrationsController = require('./controllers/calibrationdata')
const usersController = require('./controllers/userdata')
var cors = require('cors')

// CONFIGURATION / MIDDLEWARE
app.use(cors())
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
app.use('/users', usersController)

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`Running port: ${process.env.PORT}`)
})