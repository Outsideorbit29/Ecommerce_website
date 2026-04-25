const mongoose = require('mongoose');
const User = require('../models/User');

const demoteUser = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
    await User.findOneAndUpdate({ email: 'anish.grd2004@gmail.com' }, { role: 'User' });
    console.log('User anish demoted to User for testing.');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

demoteUser();
