const nodemailer = require('nodemailer');

// Create a transporter with your email provider's settings
const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail', 'Outlook'
  auth: {
    user: 'your-email@example.com',
    pass: 'your-email-password'
  }
});

module.exports = transporter;
