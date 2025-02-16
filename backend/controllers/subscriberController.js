const Subscriber = require("./../models/subscriberModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const sendEmail = require("./../utils/templateEmail");

exports.getAllPaginatedSubscribers = catchAsync(async (req, res, next) => {
  const customLabels = {
    docs: "subscribers"
  };

  const options = {
    page: req.query.page,
    limit: req.query.perPage,
    sort: { createdAt: -1 },
    customLabels,
    collation: {
      locale: "en"
    }
  };

  Subscriber.paginate({}, options, function(err, subscribers) {
    res.status(200).json({
      status: "success",
      data: {
        ...subscribers
      }
    });
  });
});

exports.getAllSubscribers = catchAsync(async (req, res, next) => {
  const subscribers = await Subscriber.find();

  res.status(200).json({
    status: "success",
    data: {
      subscribers
    }
  });
});

exports.getSubscriber = catchAsync(async (req, res, next) => {
  const subscriber = await Subscriber.findById(req.params.id);

  if (!subscriber) {
    return next(new AppError("No subscriber found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      subscriber
    }
  });
});

exports.createSubscriber = catchAsync(async (req, res, next) => {
  const subscriber = await Subscriber.findOne({ email: req.body.email });

  if (subscriber) {
    return next(
      new AppError("A subscriber with this email already exists", 409)
    );
  }

  const newSubscriber = await Subscriber.create(req.body);

  try {
    await sendEmail({
      from: "Daniel from First Electric <info@firstelectricco.com>",
      email: req.body.email,
      subject: "Thank you for subscribing to our newsletter",
      template: "welcome"
    });

    res.status(200).json({
      status: "success",
      message: "Subscription to First Electric was successful",
      subscriber: newSubscriber
    });
  } catch (err) {
    console.log(err);
    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

exports.updateSubscriber = catchAsync(async (req, res, next) => {
  const subscriber = await Subscriber.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!subscriber) {
    return next(new AppError("No subscriber found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      subscriber
    }
  });
});

exports.deleteSubscriber = catchAsync(async (req, res, next) => {
  const subscriber = await Subscriber.findByIdAndDelete(req.params.id);

  if (!subscriber) {
    return next(new AppError("No subscriber found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null
  });
});
