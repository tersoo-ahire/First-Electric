const nodemailer = require("nodemailer");

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: options.from,
    to: options.email,
    subject: options.subject,
    replyTo: options.replyTo,
    // text: options.message,
    html: options.message
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
