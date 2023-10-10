const express = require('express');

// controller functions
const { loginUser, signupUser, createUser, assignRole } = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');
const requireAdmin = require('../middleware/requireAdmin'); // Assume you've created this middleware

const router = express.Router();

// login route
router.post('/login', loginUser);

// signup route
router.post('/signup', signupUser);

// create user route (admin only)
router.post('/create-user', requireAuth, requireAdmin, createUser);

// assign role route (admin only)
router.post('/assign-role', requireAuth, requireAdmin, assignRole);

module.exports = router;
