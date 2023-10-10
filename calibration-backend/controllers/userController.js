const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv/config');
const secret = process.env.SECRET

const createToken = (_id) => {
  return jwt.sign({_id}, secret, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({firstName: user.firstName, lastName: user.lastName, email, token}) // include firstName and lastName
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user

  const signupUser = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    try {
      const user = await User.signup(firstName, lastName, email, password, role);
      const token = createToken(user._id);

      res.status(200).json({firstName, lastName, email, token});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const updateUserRole = async (req, res) => {
    const { userId, newRole } = req.body;

    try {
      const user = await User.findByIdAndUpdate(userId, { role: newRole }, { new: true });
      res.status(200).json({firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  // ... existing code





module.exports = { signupUser, loginUser, updateUserRole }