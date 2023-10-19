const express = require('express');
const { loginUser, 
    signupUser, 
    updateUserRole, 
    getClient, 
    getUserIdByClientName,
    getUserEquipmentByClientName, 
} = require('../controllers/userController');
const { requireAdmin } = require('../middleware/requireAuth');

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser); // Protect signup route
router.post('/update-role', updateUserRole); // Protect update role route
router.get('/get-client', getClient)
router.get('/get-userId', getUserIdByClientName);
router.get('/get-client-equipment', getUserEquipmentByClientName);

module.exports = router;
