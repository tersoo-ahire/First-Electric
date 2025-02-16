const Twilio = require("twilio");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const sender = process.env.TWILIO_PHONE_NUMBER;
const twilio = new Twilio(accountSid, authToken);

exports.sendSMS = async (phone, messageBody) => {
  try {
    const message = await twilio.messages.create({
      body: messageBody,
      to: phone,
      from: sender,
    });

    console.log("SMS sent");

    return message;
  } catch (error) {
    console.log(error);
  }
};
