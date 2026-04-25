const express = require('express');
const router = express.Router();
const { registerUser, authUser, getUserProfile } = require('../controllers/authController');

// We will create the protect middleware in config/middleware
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', registerUser);
router.post('/login', authUser);
router.get('/profile', protect, getUserProfile);


// Placeholders for logout, forgot password, reset password
router.post('/logout', (req, res) => {
  res.json({ message: 'Logout successful, clear token client-side' });
});

router.post('/forgot-password', (req, res) => {
  res.json({ message: 'Forgot password email sent (placeholder)' });
});

router.post('/reset-password', (req, res) => {
  res.json({ message: 'Password reset successful (placeholder)' });
});

module.exports = router;
