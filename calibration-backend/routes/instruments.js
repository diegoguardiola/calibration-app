const express = require('express');
const {addInstrumentID} = require('../controllers/instrumentIDController')
//const { requireAdmin } = require('../middleware/requireAuth');

const router = express.Router();

router.post('/add', addInstrumentID);



module.exports = router;
