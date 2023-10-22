const express = require('express');
const {
    addInstrumentID, 
    getAllInstrumentDescriptions,
    getInstrumentByID
} = require('../controllers/instrumentIDController')

const router = express.Router();

router.post('/add', addInstrumentID);
router.get('/get-descriptions', getAllInstrumentDescriptions);
router.get('/:id/get-info', getInstrumentByID);

module.exports = router;