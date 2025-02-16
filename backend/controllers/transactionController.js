const Transaction = require("./../models/transactionModel");
const Payment = require('../models/paymentsModel');
const Referral = require("./../models/referralModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const sendEmail = require("./../utils/templateEmail");

const generateTransactionRef = (size = 6, alpha = true) => {
  let characters = alpha
    ? "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    : "0123456789";
  characters = characters.split("");
  let selections = "";
  for (let i = 0; i < size; i++) {
    let index = Math.floor(Math.random() * characters.length);
    selections += characters[index];
    characters.splice(index, 1);
  }
  return selections;
};

const convertCurrency = amount => {
  if (isNaN(amount)) {
    return amount;
  }

  // Convert the value
  convertedAmount = parseFloat(amount.toString().replace(/,/g, ""))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return convertedAmount;
};

exports.getTransactions = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Transaction.find({ refereeId: req.params.refereeId }),
    req.query
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const transactions = await features.query;

  if (!transactions) {
    return next(new AppError("No transaction found for this user", 404));
  }

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    data: {
      transactions
    }
  });
});

exports.createTransaction = catchAsync(async (req, res, next) => {
  const referee = await Referral.findById(req.body.refereeId);

  const txRef = generateTransactionRef(8, true);

  const newTransaction = await Transaction.create({
    ...req.body,
    txRef
  });

  try {
    await sendEmail({
      from: "First Electric Referrals <info@firstelectricco.com>",
      email: referee.email,
      subject: "Transaction made on your First Electric account",
      template: "transaction",
      firstName: referee.firstName,
      commission: convertCurrency(req.body.commission),
      customerName: req.body.customerName,
      txRef
    });

    res.status(200).json({
      status: "success",
      message: "Transaction made successfully",
      transaction: newTransaction
    });
  } catch (err) {
    console.log(err);
    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

exports.getPayments = async(req, res, next) => {
  try {
    const customLabels = {
      docs: "payments"
  };
  const options = {
      page: req.query.page,
      limit: req.query.perPage,
      sort: { createdAt: -1 },
      customLabels,
      collation: {
        locale: "en"
      },
      populate: 'customer'
  };
  Payment.paginate({}, options, (err, payments)=>{
      res.status(200).json({
          status: 'success',
          data: {...payments}
      })
  })
  } catch (error) {
    return next(error);
  }
}
