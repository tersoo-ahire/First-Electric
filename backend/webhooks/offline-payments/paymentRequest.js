const Meter = require("../../models/paygoModels/meter");
const Payment = require("../../models/paygoModels/payment");
const sendEmail = require("../../utils/templateEmail");
const { sendSMS } = require("../../utils/sms");
const { sendWhatsAppMessage } = require("../../utils/whatsapp");
const axios = require("axios");
const moment = require("moment");

const convertCurrency = (amount) => {
  convertedAmount = parseFloat(amount.toString().replace(/,/g, ""))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return convertedAmount;
};

const generatePaymentRef = () => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 10; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return "PAYGO-" + text;
};

exports.paymentRequest = async (req, res, next) => {
  try {
    const meter = await Meter.findOne({
      meterNumber: req.body.paymentRecipientId,
    });

    console.log(`Monnify offline did a payment request for a meter with the number ${meter.meterNumber} and name ${meter.meterName}`)

    const paymentRef = generatePaymentRef();

    let response = await axios.post(
      `${process.env.MEMMCOL_API}/PaymentV2/${req.body.paymentRecipientId}/prepaid/${process.env.MEMMCOL_MERCHANT_ID}/${paymentRef}/${req.body.amount}`
    );

    const reqData = {
      meter: meter._id,
      topupStatus: response.data.responsedesc,
      paymentStatus: "PAID",
      paymentGatewayMessage: "PAID",
      amount: req.body.amount,
      paymentReference: paymentRef,
      transactionReference: req.body.transactionReference,
      paymentSource: "offline",
      modeOfPayment: "cash",
      token: response.data.recieptNumber,
      customer: response.data.customer,
    };

    const transaction = await Payment.create(reqData);
    console.log(transaction)

    if (response.data.responsecode == "00") {
      const messageBody = `Transaction Successful.\n\nToken: ${response.data.recieptNumber} \n\nThank you for using PayGo by First Electric.`;

      await sendSMS(meter.phone, messageBody);
      await sendWhatsAppMessage(meter.phone, messageBody);

      await sendEmail({
        from: "First Electric PayGo <info@firstelectricco.com>",
        email: meter.email,
        subject: "PAYGO - TOKEN DETAILS",
        template: "paygoTransaction",
        recieptNumber: response.data.recieptNumber,
        transactionDate: moment(response.data.transactionDate).format("LL"),
        reference: paymentRef,
        paidamount: "₦" + convertCurrency(response.data.paidamount),
        costOfUnit: "₦" + convertCurrency(response.data.costOfUnit),
        vat: "₦" + convertCurrency(response.data.vat),
        tariff: "₦" + response.data.customer.tariff,
        unit: response.data.unit,
      }).then(() => console.log("Email sent successfully"));

      return res.status(200).json({
        responseCode: "00",
        productCode: req.body.productCode,
        paymentRecipientId: req.body.paymentRecipientId,
        transactionReference: req.body.transactionReference,
        paymentToken: response.data.recieptNumber,
      });
    } else {
      return res.status(200).json({
        responseCode: "01",
        responseMessage: response.data.responsedesc,
      });
    }
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
