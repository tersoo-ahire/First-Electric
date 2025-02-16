const Meter = require("../../models/paygoModels/meter");
const Payment = require("../../models/paygoModels/payment");
const sendEmail = require("../../utils/templateEmail");
const { sendSMS } = require("../../utils/sms");
const { sendWhatsAppMessage } = require("../../utils/whatsapp");
const axios = require("axios");
const moment = require("moment");
const AppError = require("../../utils/appError");
const { formatCurrency } = require("../../utils/helpers");
const NodeCache = require("node-cache");
const cache = new NodeCache();

const apiKey = process.env.MONNIFY_API_KEY;
const apiSecret = process.env.MONNIFY_SECRET_KEY;
const baseUrl = process.env.MONNIFY_BASE_URL;

const setCache = async (key, value, ttl = null) => {
  if (ttl) {
    return cache.set(key, value, ttl);
  }

  return cache.set(key, value);
};

const getCache = async (key) => {
  return cache.get(key);
};

const delCache = async (key) => {
  return cache.del(key);
};

const authenticateMonnify = async () => {
  try {
    const cachedAccessToken = await getCache("monnifyAccessToken");
    if (cachedAccessToken) {
      return cachedAccessToken;
    }

    const clientIDSecretInBase64 = Buffer.from(
      apiKey + ":" + apiSecret
    ).toString("base64");

    const headers = {
      Authorization: "Basic " + clientIDSecretInBase64,
    };
    const response = await axios.post(baseUrl + "/api/v1/auth/login", null, {
      headers,
    });
    const { responseBody } = response.data;
    const { accessToken, expiresIn } = responseBody;

    await setCache("monnifyAccessToken", accessToken, expiresIn);

    return accessToken;
  } catch (error) {
    console.error(
      "Error authenticating on Monnify. Monnify error: ",
      error.response.data.responseMessage
    );
    console.error(
      "Error authenticating on Monnify. Server error: ",
      error.message
    );
  }
};

const convertCurrency = (amount) => {
  convertedAmount = parseFloat(amount.toString().replace(/,/g, ""))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return convertedAmount;
};

exports.topupWithMonnify = async (req, res, next) => {
  try {
    const meter = await Meter.findOne({
      meterNumber: req.body.meterNo,
    });

    const accessToken = await authenticateMonnify();

    const headers = {
      Authorization: "Bearer " + accessToken,
    };

    const verification = await axios.get(
      `${baseUrl}/api/v2/transactions/${req.body.transactionReference}`,
      { headers }
    );

    let { responseBody } = verification.data;

    if (responseBody.paymentStatus == "PAID") {
      let response = await axios.post(
        `${process.env.MEMMCOL_API}/PaymentV2/${req.body.meterNo}/prepaid/${process.env.MEMMCOL_MERCHANT_ID}/${responseBody.paymentReference}/${responseBody.amountPaid}`
      );

      const reqData = {
        meter: meter._id,
        topupStatus: response.data.responsedesc,
        paymentStatus: responseBody.paymentStatus,
        paymentGatewayMessage: responseBody.paymentStatus,
        amount: responseBody.amountPaid,
        paymentReference: responseBody.paymentReference,
        transactionReference: req.body.transactionReference,
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
          reference: responseBody.paymentReference,
          paidamount: "₦" + convertCurrency(response.data.paidamount),
          costOfUnit: "₦" + convertCurrency(response.data.costOfUnit),
          vat: "₦" + convertCurrency(response.data.vat),
          tariff: "₦" + response.data.customer.tariff,
          unit: response.data.unit,
        });

        return res.status(200).json({
          status: "success",
          message: `Your top up request of ₦${formatCurrency(
            responseBody.amountPaid
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
    return next(error);
  }
};
