const Meter = require("../../models/paygoModels/meter");
const Payment = require("../../models/paygoModels/payment");
const AppError = require("../../utils/appError");

exports.getAllPayments = async (req, res, next) => {
  try {
    const customLabels = {
      docs: "payments",
    };
    let options = {
      pagination: false,
      customLabels,
      populate: "meter",
      sort: { createdAt: -1 },
    };

    if (req.query.perPage || req.query.page) {
      options = {
        page: req.query.page,
        limit: req.query.perPage,
        sort: { createdAt: -1 },
        populate: "meter",
        customLabels,
        collation: {
          locale: "en",
        },
      };
    }

    let query = {};

    if (req.query.meterNumber) {
      const meter = await Meter.findOne({ meterNumber: req.query.meterNumber });

      if (!meter) {
        return next(new AppError("Meter does not exist", 400));
      }

      query.meter = meter._id;
    }

    Payment.paginate(query, options, (err, payments) => {
      return res.status(200).json({
        status: "success",
        message: "Payments fetched successfully",
        data: { ...payments },
      });
    });
  } catch (error) {
    return next(error);
  }
};

exports.getPendingPayments = async (req, res, next) => {
  try {
    const pendingPayments = await Payment.find({ status: "pending" }).populate(
      "meter"
    );

    const resData = [];
    await pendingPayments.map((payment) => {
      const data =
        payment.meter.meterNumber +
        "/" +
        payment.amount +
        "/" +
        payment._id +
        "/" +
        payment.meter.meterTariff;

      resData.push(data);
    });

    res.send(resData);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.markPaymentSuccessful = async (req, res, next) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status: "success" },
      { new: true }
    );

    if (!payment)
      return next(new AppError("Sorry, this transaction does not exist", 404));

    res.status(200).json({
      status: "success",
      message: "Transaction updated successfully",
      data: payment,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
