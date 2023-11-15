const express = require('express');
const {
    addInstrumentID, 
    getAllInstrumentDescriptions,
    getInstrumentByID,
    getAllinstruments,
    deleteInstrumentById
} = require('../controllers/instrumentIDController')
const {requireAuth} = require('../middleware/requireAuth')

const router = express.Router();
//router.use(requireAuth)

router.post('/add', addInstrumentID);
router.get('/get-descriptions', getAllInstrumentDescriptions);
router.get('/:id/get-info', getInstrumentByID);
router.get('/get-all-instruments', getAllinstruments);
router.delete('/:instrumentId/delete-instrument', deleteInstrumentById)

module.exports = router;