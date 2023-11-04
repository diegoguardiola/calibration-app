const express = require('express');
const { loginUser, 
    signupUser, 
    updateUserRole, 
    getClient, 
    getUserIdByClientName,
    getEquipmentByUserId,
    getUsersObjectIdAndCompany,
    getInfoByUserId
} = require('../controllers/userController');
const { requireAdmin } = require('../middleware/requireAuth');

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser); // Protect signup route
router.post('/update-role', updateUserRole); // Protect update role route
router.get('/get-client', getClient)
router.get('/get-userId', getUserIdByClientName);
router.get('/get-user-company-id', getUsersObjectIdAndCompany);
router.get('/:userId/equipment', getEquipmentByUserId);
router.get('/:userId/client-info', getInfoByUserId);


module.exports = router;
