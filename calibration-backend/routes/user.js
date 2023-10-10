const express = require('express');
const { loginUser, signupUser, updateUserRole } = require('../controllers/userController');
const { requireAdmin } = require('../middleware/requireAuth');

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser); // Protect signup route
router.post('/update-role', updateUserRole); // Protect update role route

module.exports = router;
