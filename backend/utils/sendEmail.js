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
    console.error('Email sending failed, but here is the content:');
    console.log('TO:', options.email);
    console.log('SUBJECT:', options.subject);
    console.log('MESSAGE:', options.message);
    // Rethrow to let the controller handle it if needed, 
    // or just absorb it for dev. 
    // For now, I'll rethrow.
    throw error;
  }
};

module.exports = sendEmail;
