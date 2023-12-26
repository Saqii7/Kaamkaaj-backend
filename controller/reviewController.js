const Review = require('../models/reviewSchema');
const { authorizeRoles } = require('./authController');

// Controller functions for review-related operations

// Create a new review
async function createReview(req, res) {
  const { userId, vendorId, serviceType, rating, comment } = req.body;

  try {
    const newReview = await Review.create({
      user: userId,
      vendor: vendorId,
      serviceType,
      rating,
      comment,
    });

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get all reviews (only accessible to Super Admin)
const getAllReviews = authorizeRoles(['Super Admin'], async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Other controller functions for review operations

module.exports = {
  createReview,
  getAllReviews,
};
