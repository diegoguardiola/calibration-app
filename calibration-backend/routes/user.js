const express = require('express');
const { loginUser, signupUser, updateUserRole } = require('../controllers/userController');
const checkIsAdmin = require('../middleware/checkIsAdmin');

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', checkIsAdmin, signupUser); // Protect signup route
router.post('/update-role', checkIsAdmin, updateUserRole); // Protect update role route

module.exports = router;
