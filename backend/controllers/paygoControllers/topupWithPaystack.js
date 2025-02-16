const Meter = require("../../models/paygoModels/meter");
const Payment = require("../../models/paygoModels/payment");
const sendEmail = require("../../utils/templateEmail");
const { sendSMS } = require("../../utils/sms");
const { sendWhatsAppMessage } = require("../../utils/whatsapp");
const { default: Axios } = require("axios");
const moment = require("moment");
const AppError = require("../../utils/appError");
const { formatCurrency } = require("../../utils/helpers");

const convertCurrency = (amount) => {
  convertedAmount = parseFloat(amount.toString().replace(/,/g, ""))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return convertedAmount;
};

const getHeaders = {
  Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
};

exports.topupWithPaystack = async (req, res, next) => {
  try {
    const meter = await Meter.findOne({
      meterNumber: req.body.meterNo,
    });

    let verification = await Axios.request({
      url: `https://api.paystack.co/transaction/verify/${req.body.paymentReference}`,
      method: "GET",
      headers: getHeaders,
    });

    console.log("Paystack verification", verification)

    if (verification.data.data.status == "success") {
      let response = await Axios.request({
        url: `${process.env.MEMMCOL_API}/PaymentV2/${
          req.body.meterNo
        }/prepaid/${process.env.MEMMCOL_MERCHANT_ID}/${
          req.body.paymentReference
        }/${verification.data.data.amount / 100}`,
        method: "POST",
      });

      console.log("Memmcol response", response);

      const reqData = {
        meter: meter._id,
        topupStatus: response.data.responsedesc,
        paymentStatus: verification.data.data.status,
        paymentGatewayMessage: verification.data.data.gateway_response,
        amount: verification.data.data.amount / 100,
        paymentReference: req.body.paymentReference,
        token: response.data.recieptNumber,
        customer: response.data.customer,
      };

      await Payment.create(reqData);

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
          reference: req.body.paymentReference,
          paidamount: "₦" + convertCurrency(response.data.paidamount),
          costOfUnit: "₦" + convertCurrency(response.data.costOfUnit),
          vat: "₦" + convertCurrency(response.data.vat),
          tariff: "₦" + response.data.customer.tariff,
          unit: response.data.unit,
        });

        return res.status(200).json({
          status: "success",
          message: `Your top up request of ₦${formatCurrency(
            verification.data.data.amount / 100
          )} is successful`,
          data: response.data,
        });
      } else {
        return next(new AppError(response.data.responsedesc, 400));
      }
    } else {
      return next(new AppError("Payment error occurred", 400));
    }
  } catch (error) {
    console.log(error);
    return next(
      new AppError(error.response.data.message, error.response.status)
    );
  }
};
