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
    // Validate role
    if (!['admin', 'user', 'otherRole'].includes(role)) {
      throw new Error('Invalid role provided');
    }

    const user = await User.signup(firstName, lastName, email, password, role);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({firstName: user.firstName, lastName: user.lastName, email, role, token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// assign a role to a user
const assignRole = async (req, res) => {
  const { userId, newRole } = req.body;

  try {
    // Validate role
    if (!['admin', 'user', 'otherRole'].includes(newRole)) {
      throw new Error('Invalid role provided');
    }

    // Find user and update role
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.role = newRole;
    await user.save();

    res.status(200).json({ message: 'Role updated successfully', userId: user._id, newRole });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// createUser function
const createUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    // Validate role
    if (!['admin', 'user', 'otherRole'].includes(role)) {
      throw new Error('Invalid role provided');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user
    const user = await User.create({ firstName, lastName, email, password, role });

    // create a token
    const token = createToken(user._id);

    res.status(201).json({firstName: user.firstName, lastName: user.lastName, email, role, token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { signupUser, loginUser, assignRole, createUser };

