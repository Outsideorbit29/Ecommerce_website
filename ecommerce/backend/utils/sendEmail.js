const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create a transporter
  // Using Mailtrap or similar for testing. 
  // For production, use actual SMTP settings in .env
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: 'Acme Store <onboarding@resend.dev>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${options.email}`);
  } catch (error) {
    console.error('Email sending failed (this is common in dev without a verified domain):');
    console.log('--- FALLBACK LOG ---');
    console.log('TO:', options.email);
    console.log('SUBJECT:', options.subject);
    console.log('MESSAGE:', options.message);
    console.log('--------------------');
    // Do not rethrow in development to allow signup flow to continue
    if (process.env.NODE_ENV === 'production') {
      throw error;
    }
  }
};

module.exports = sendEmail;
