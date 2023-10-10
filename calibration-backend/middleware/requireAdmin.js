// middleware/requireAdmin.js

const User = require('../models/userModel');

const requireAdmin = async (req, res, next) => {
  try {
    // Assuming `req.user` contains the authenticated user's ID
    const user = await User.findById(req.user._id);
    if (!user || user.role !== 'admin') {
      throw new Error('Not authorized as an admin.');
    }
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = requireAdmin;
