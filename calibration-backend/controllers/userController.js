const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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

    res.status(200).json({
      id: user._id,
      firstName: user.firstName, 
      lastName: user.lastName, 
      company: user.company,
      email: user.email, 
      phone: user.phone,
      token,
      role: user.role  // Add this line to include the role in the response
    })// include firstName and lastName
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
  const signupUser = async (req, res) => {
    const { firstName, lastName, company, address, phone,  email, password, role } = req.body;

    try {
      const user = await User.signup(firstName, lastName, company, address, phone, email, password, role);
      const token = createToken(user._id);

      res.status(200).json({firstName, lastName, company, address, phone, email, role, token});
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  //update user
  const updateUser = async (req, res) => {
    const { userId } = req.params; // Assuming you're passing the user ID as a URL parameter
    const { firstName, lastName, email, phone, password } = req.body; // Include password in the fields to update
  
    try {
      // If a new password is provided, hash it
      let updateObject = { firstName, lastName, phone, email };
      if (password) {
        const salt = await bcrypt.genSalt(10);
        updateObject.password = await bcrypt.hash(password, salt);
      }
  
      const user = await User.findByIdAndUpdate(
        userId,
        updateObject,
        { new: true, runValidators: true }
      );
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({
        message: 'User updated successfully',
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          email: user.email,
          // Do not return the password, even if it's hashed
        }
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  //select client by name and return client name and user_id
  const getClient = async (req, res) => {
    try {
        const clients = await User.find({}, 'company _id'); // Fetch company and _id fields
        res.json(clients);
    } catch (error) {
        console.error("Error fetching clients:", error);
        res.status(500).send("Internal Server Error");
    }
  };

  //get list of userID by clientName
  const getUserIdByClientName = async (req, res) => {
    const clientName = req.query.clientName;

    try {
        const user = await User.findOne({ company: clientName });
        if (!user) {
            return res.status(404).json({ error: "Client not found" });
        }
        res.json({ userId: user._id });
    } catch (error) {
        console.error("Error fetching userId:", error);
        res.status(500).send("Internal Server Error");
    }
};

//controller function getting id and company for CalibrationForm
const getUsersObjectIdAndCompany = async (req, res) => {
  try {
      // Find users with role 'client' and select only their ObjectID and company name
      const users = await User.find({ role: 'client' }, '_id company');

      // Send the result as a response
      res.status(200).json(users);
  } catch (error) {
      // Handle any errors that might occur
      res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

const getEquipmentByUserId = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming the user ObjectId is passed as a route parameter

    // Find the user by ObjectId and populate the 'equipment' field
    const user = await User.findById(userId).populate('equipment');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract the equipment list from the user object
    const equipmentList = user.equipment;

    return res.status(200).json({ equipmentList });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const getInfoByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      company: user.company,
      address: user.address,
      phone: user.phone,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//retrieve all users
const getAllUsers = async (req, res) => {
  try {
      const users = await User.find({});
      res.status(200).json(users);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

//delete user by id
const deleteUserById = async (req, res) => {
  try {
      const { userId } = req.params;
      const user = await User.findByIdAndDelete(userId);

      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};






module.exports = { 
  signupUser, 
  loginUser, 
  updateUser,
  getClient, 
  getUserIdByClientName,
  getEquipmentByUserId,
  getUsersObjectIdAndCompany,
  getInfoByUserId,
  getAllUsers,
  deleteUserById
 };
