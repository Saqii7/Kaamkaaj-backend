const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userSchema');
require('dotenv').config(); // Load environment variables from .env file

// Authentication functions

// Login
async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, userType: user.userType }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Signup
async function signup(req, res) {
  const { username, email, password, userType } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      userType,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Authorization middleware
function authorizeRoles(roles) {
  return (req, res, next) => {
    const { userType } = req.user;

    if (!roles.includes(userType)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    next();
  };
}

module.exports = {
  login,
  signup,
  authorizeRoles,
};
