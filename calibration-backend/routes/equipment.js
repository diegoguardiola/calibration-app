const express = require('express');
const {
    addEquipmentID, 
} = require('../controllers/equipmentIDController')
//const { requireAdmin } = require('../middleware/requireAuth');

const router = express.Router();

router.post('/add', addEquipmentID);

module.exports = router;
