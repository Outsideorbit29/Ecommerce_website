const mongoose = require('mongoose');
const User = require('../models/Product').User || require('../models/User'); 

const checkVerification = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
    const users = await User.find({});
    console.log('--- User Verification Status ---');
    users.forEach(u => console.log(`Name: ${u.name}, Email: ${u.email}, Verified: ${u.isVerified}, Token: ${u.verificationToken}`));
    console.log('-------------------------------');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkVerification();
