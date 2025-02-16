const crypto = require("crypto");
const { promisify } = require("util");
const APIFeatures = require("./../utils/apiFeatures");
const Referral = require("./../models/referralModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const sendEmail = require("./../utils/templateEmail");

const generateOTCode = (size = 6, alpha = true) => {
  let characters = alpha
    ? "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
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

exports.register = catchAsync(async (req, res, next) => {
  const { email } = req.body;

  // Check if referee exists
  const referee = await Referral.findOne({ email: email.toLowerCase() });
  if (referee) {
    return next(
      new AppError("A referee with this email address already exists", 409)
    );
  }

  let referralCode = "FEC-" + generateOTCode(8, true);

  const newReferee = await Referral.create({
    ...req.body,
    email: email.toLowerCase(),
    referralCode,
  });

  try {
    await sendEmail({
      from: "First Electric Referrals <info@firstelectricco.com>",
      email: newReferee.email,
      subject: "Welcome to First Electric Referral Program",
      template: "referralWelcome",
      referralCode,
    });

    res.status(200).json({
      status: "success",
      message: "Referee registered successfully",
      referee: newReferee,
    });
  } catch (err) {
    console.log(err);
    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

exports.getAllReferees = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Referral.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const referees = await features.query;

  const totalResults = await Referral.count();
  const totalPages = (await totalResults) / req.query.limit || 1;

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    currentPage: req.query.page,
    totalPages,
    totalResults,
    results: referees.length,
    data: {
      referees,
    },
  });
});

exports.getReferee = catchAsync(async (req, res, next) => {
  const referee = await Referral.findOne({
    referralCode: req.params.referralCode,
  });

  if (!referee) {
    return next(new AppError("No referee found with that referral code", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      referee,
    },
  });
});
