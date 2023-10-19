const express = require('express');
const {addInstrumentID} = require('../controllers/instrumentIDController')

const router = express.Router();

router.post('/add', addInstrumentID);

module.exports = router;