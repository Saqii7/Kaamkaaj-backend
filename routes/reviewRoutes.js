const express = require('express');
const router = express.Router();
const ReviewController = require('../controller/reviewController');
const { authorizeRoles } = require('../controller/authController'); // Import the authorizeRoles function

// Routes for review-related operations

// Create a new review
router.post('/create', ReviewController.createReview);

// Get all reviews (only accessible to Super Admin)
router.get('/all', authorizeRoles(['Super Admin']), ReviewController.getAllReviews);

module.exports = router;
