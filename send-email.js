require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmail = firstname => {
  console.log('SEND EMAIL:');
  const emailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.FROM_ADDRESS,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: process.env.FROM_ADDRESS,
    to: process.env.TO_ADDRESS,
    subject: 'User Registered',
    text: `Hi ${firstname}, You have been registered to lantronix.com`
  };

  emailTransporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendEmail;
