const express = require('express');
const { loginUser, signupUser, createUser, assignRole, updateUserRole } = require('../controllers/userController');
const { requireAuth, requireAdmin } = require('../middleware/requireAuth');


console.log({loginUser, signupUser, createUser, assignRole, requireAuth, requireAdmin});

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/create-user', requireAuth, requireAdmin, createUser);
router.post('/assign-role', requireAuth, requireAdmin, assignRole);
router.post('/update-role', requireAuth, requireAdmin, updateUserRole);


module.exports = router;
