const nodemailer = require('nodemailer');

const sendResetEmail = async (email, resetURL) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'mohammadahsan1965@gmail.com',
      pass: 'itsyouboyahs@n2000',
    },
  });

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `You requested a password reset. Please click on the following link to reset your password: ${resetURL}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendResetEmail;
