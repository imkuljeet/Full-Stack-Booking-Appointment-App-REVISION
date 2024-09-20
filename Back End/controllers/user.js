const User = require('../models/User');

// Add a new user
const addUser = async (req, res, next) => {
  try {
    console.log("Req Body is", req.body);
    
    const { name, phn, email } = req.body;

    // Validate input
    if (!name || !phn || !email) {
      return res.status(400).json({ error: "Name, phone, and email are required" });
    }

    const newUser = await User.create({ name: name, email: email, phone: phn });
    res.status(201).json({ newUserDetail: newUser });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all users
const getUser = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users); // Successful response
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate input
    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const deleted = await User.destroy({ where: { id } });

    if (deleted) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  addUser,
  getUser,
  deleteUser
};
