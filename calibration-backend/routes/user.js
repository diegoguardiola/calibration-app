const express = require('express');
const { loginUser, 
    signupUser, 
    getClient, 
    updateUser,
    getUserIdByClientName,
    getEquipmentByUserId,
    getUsersObjectIdAndCompany,
    getInfoByUserId
} = require('../controllers/userController');
const { requireAdmin } = require('../middleware/requireAuth');

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser); 
router.patch('/update/:userId', updateUser);
router.get('/get-client', getClient)
router.get('/get-userId', getUserIdByClientName);
router.get('/get-user-company-id', getUsersObjectIdAndCompany);
router.get('/:userId/equipment', getEquipmentByUserId);
router.get('/:userId/client-info', getInfoByUserId);


module.exports = router;
