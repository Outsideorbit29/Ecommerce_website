const mongoose = require('mongoose');
const User = require('../models/User');

const makeAdmin = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
    const user = await User.findOneAndUpdate(
      { email: 'anish.grd2004@gmail.com' },
      { role: 'Admin' },
      { new: true }
    );
    if (user) {
      console.log(`User ${user.name} is now an Admin.`);
    } else {
      console.log('User not found.');
    }
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

makeAdmin();
