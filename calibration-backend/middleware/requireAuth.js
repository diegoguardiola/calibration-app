const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv/config');

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'});
  }

  const token = authorization.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ _id }).select('_id');

    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error); // Log errors in a safe way
    res.status(401).json({error: 'Request is not authorized'});
  }
};

const requireAdmin = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'});
  }

  const token = authorization.split(' ')[1];
  
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    const user = await User.findOne({ _id }).select('_id');
    if (!user || user.role !== 'admin') {
      throw new Error('Not authorized as an admin.');
    }

    next();
  } catch (error) { 
    console.error(error); // Log errors in a safe way
    res.status(401).json({ error: error.message });
  }
};

module.exports = { requireAuth, requireAdmin };
