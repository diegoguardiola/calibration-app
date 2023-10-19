const express = require('express');
const { loginUser, 
    signupUser, 
    updateUserRole, 
    getClient, 
    getUserIdByClientName,
    getEquipmentByUserId,
} = require('../controllers/userController');
const { requireAdmin } = require('../middleware/requireAuth');

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser); // Protect signup route
router.post('/update-role', updateUserRole); // Protect update role route
router.get('/get-client', getClient)
router.get('/get-userId', getUserIdByClientName);
router.get('/user/:userId/get-equipmentlist', getEquipmentByUserId);



module.exports = router;
