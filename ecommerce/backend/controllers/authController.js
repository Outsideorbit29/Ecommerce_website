const jwt = require('jsonwebtoken');
const User = require('../models/User');
const axios = require('axios');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, turnstileToken } = req.body;

    // Verify Cloudflare Turnstile
    const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const secret = process.env.TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA'; 
    
    const turnstileRes = await axios.post(verifyUrl, `secret=${secret}&response=${turnstileToken}`, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (!turnstileRes.data.success) {
      return res.status(400).json({ message: 'Bot verification failed. Please try again.' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'User',
      verificationToken,
      isVerified: false,
    });

    if (user) {
      // Send Verification Email
      const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email/${verificationToken}`;
      
      const message = `Please verify your email by clicking: ${verifyUrl}`;
      const html = `
        <h1>Email Verification</h1>
        <p>Please verify your email by clicking the button below:</p>
        <a href="${verifyUrl}" style="padding: 10px 20px; background: black; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
      `;

      try {
        await sendEmail({
          email: user.email,
          subject: 'Verify your email - Acme Store',
          message,
          html,
        });

        res.status(201).json({
          message: 'Registration successful! Please check your email to verify your account.',
        });
      } catch (err) {
        // We keep the verification token so it can be verified manually or retried
        return res.status(500).json({ message: 'User created but verification email could not be sent. Please contact support.', error: err.message });
      }
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if (!user.isVerified) {
        return res.status(401).json({ message: 'Please verify your email before logging in.' });
      }
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get user profile (protected route via middleware later)
// @route   GET /api/auth/profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Verify email
// @route   GET /api/auth/verify-email/:token
const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ message: 'Email verified successfully! You can now log in.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerUser, authUser, getUserProfile, verifyEmail };
