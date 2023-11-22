const express = require('express');
const {
    addEquipmentID, 
    deleteEquipment,
} = require('../controllers/equipmentIDController')
//const { requireAdmin } = require('../middleware/requireAuth');

const router = express.Router();

router.post('/add', addEquipmentID);
router.delete('/delete', deleteEquipment);

module.exports = router;
