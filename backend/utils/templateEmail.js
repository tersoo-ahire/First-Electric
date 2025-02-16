const nodemailer = require("nodemailer");
const Email = require("email-templates");

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const email = new Email({
    transport: transporter,
    send: true,
    preview: false,
    views: {
      options: {
        extension: "ejs"
      }
    }
  });

  const mailOptions = {
    template: options.template,
    message: {
      from: options.from,
      to: options.email,
      subject: options.subject,
      replyTo: options.replyTo,
      // text: options.text,
    },
    locals: {
      referralCode: options.referralCode,
      firstName: options.firstName,
      commission: options.commission,
      customerName: options.customerName,
      txRef: options.txRef,
      recieptNumber: options.recieptNumber,
      transactionDate: options.transactionDate,
      reference: options.reference,
      paidamount: options.paidamount,
      costOfUnit: options.costOfUnit,
      vat: options.vat,
      tariff: options.tariff,
      unit: options.unit,
    },
  };

  await email.send(mailOptions)
};

module.exports = sendEmail;
