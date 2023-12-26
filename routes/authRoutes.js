const express = require('express');
const router = express.Router();
const AuthController = require('../controller/authController');

// Route for user login
router.post('/login', AuthController.login);

// Route for user signup
router.post('/signup', AuthController.signup);

module.exports = router;
