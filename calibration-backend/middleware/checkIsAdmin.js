const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv/config');

const secret = process.env.SECRET;

const checkIsAdmin = async (req, res, next) => {
  try {
    // Get token from headers
    const token = req.headers.authorization.split(' ')[1];
    
    // Decode token
    const decodedToken = jwt.verify(token, secret);
    
    // Find user and check role
    const user = await User.findById(decodedToken._id);
    if (!user || user.role !== 'admin') {
      throw new Error('Not an admin');
    }
    
    // Proceed to next middleware or route handler
    next();
  } catch (error) {
    res.status(403).json({ error: 'Access denied' });
  }
};

module.exports = checkIsAdmin;
