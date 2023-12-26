const express = require('express');
const mongoose = require('mongoose');
const db = require('./db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes setup
const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/bookings', bookingRoutes);
app.use('/reviews', reviewRoutes);
app.use('/auth', authRoutes);



// Start the server only after successfully connecting to the database
db.once('open', () => {
  console.log('Connected to MongoDB!');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// Handle MongoDB connection errors
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
