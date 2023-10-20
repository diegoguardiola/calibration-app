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

    res.status(200).json({
      firstName: user.firstName, 
      lastName: user.lastName, 
      company: user.company,
      email, 
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

  const updateUserRole = async (req, res) => {
    const { userId, newRole } = req.body;

    try {
      const user = await User.findByIdAndUpdate(userId, { role: newRole }, { new: true });
      res.status(200).json({
        firstName: user.firstName, 
        lastName: user.lastName, 
        company: user.company,
        address: user.address,
        phone: user.phone,
        email: user.email, 
        role: user.role});
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
        // Find all users and select only their ObjectID and company name
        const users = await User.find({}, '_id company');

        // Send the result as a response
        res.status(200).json(users);
    } catch (error) {
        // Handle any errors that might occur
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};


const getEquipmentByUserId = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming the user's ID is passed as a route parameter

    // Find the user by ID and populate the 'equipment' field
    const user = await User.findById(userId).populate('equipment');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract the equipment array from the user object
    const equipment = user.equipment;

    res.status(200).json({ equipment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { 
  signupUser, 
  loginUser, 
  updateUserRole, 
  getClient, 
  getUserIdByClientName,
  getEquipmentByUserId,
  getUsersObjectIdAndCompany
 };
