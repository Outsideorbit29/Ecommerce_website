const sendEmail = require('./utils/sendEmail');
const dotenv = require('dotenv');
dotenv.config();

const test = async () => {
  try {
    await sendEmail({
      email: 'test@example.com',
      subject: 'Test Email',
      message: 'This is a test message',
      html: '<h1>Test</h1>'
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email failed:', error);
  }
};

test();
