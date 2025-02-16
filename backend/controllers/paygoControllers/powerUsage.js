const PowerUsage = require("../../models/paygoModels/powerUsage");
const Meter = require("../../models/paygoModels/meter");

exports.createUsage = async (req, res, next) => {
  try {
    const usage = await PowerUsage.insertMany(req.body);

    return res.status(200).json({
      status: "success",
      message: "Power consumptions created successfully",
      data: usage,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.getAllUsages = async (req, res, next) => {
  try {
    const customLabels = {
      docs: "powerUsage",
    };
    let options = {
      pagination: false,
      customLabels,
      sort: { createdAt: -1 },
    };

    if (req.query.perPage || req.query.page) {
      options = {
        page: req.query.page,
        limit: req.query.perPage,
        sort: { createdAt: -1 },
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

      query.meterNumber = req.query.meterNumber;
    }

    PowerUsage.paginate(query, options, (err, powerUsage) => {
      return res.status(200).json({
        status: "success",
        message: "Power usage fetched successfully",
        data: { ...powerUsage },
      });
    });
  } catch (error) {
    return next(error);
  }
};

exports.usageAnnualStats = async (req, res, next) => {
  try {
    const meter = await Meter.findOne({ meterNumber: req.query.meterNumber });

    if (!meter) {
      return next(new AppError("Meter does not exist", 400));
    }

    const annualStats = await PowerUsage.aggregate([
      {
        $match: {
          meterNumber: req.query.meterNumber,
        },
      },
      {
        $group: {
          _id: {
            $year: {
              date: "$loggedDate",
              timezone: "Africa/Lagos",
            },
          },
          powerConsumed: { $sum: "$powerConsumed" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          year: "$_id",
          powerConsumed: "$powerConsumed",
          count: "$count",
          _id: 0,
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      message: "Annual usage statistics fetched successfully",
      data: annualStats,
    });
  } catch (error) {
    return next(error);
  }
};

exports.loanMonthlyStats = async (req, res, next) => {
  try {
    const meter = await Meter.findOne({ meterNumber: req.query.meterNumber });

    if (!meter) {
      return next(new AppError("Meter does not exist", 400));
    }
    
    const monthlyStats = await PowerUsage.aggregate([
      {
        $match: {
          meterNumber: req.query.meterNumber,
        },
      },
      {
        $group: {
          _id: {
            month: {
              $month: {
                date: "$loggedDate",
                timezone: "Africa/Lagos",
              },
            },
            year: {
              $year: {
                date: "$loggedDate",
                timezone: "Africa/Lagos",
              },
            },
          },
          powerConsumed: { $sum: "$powerConsumed" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: "$_id.month",
          year: "$_id.year",
          powerConsumed: "$powerConsumed",
          count: "$count",
          _id: 0,
        },
      },
      {
        $addFields: {
          month: {
            $let: {
              vars: {
                monthsInString: [
                  ,
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul",
                  "Aug",
                  "Sep",
                  "Oct",
                  "Nov",
                  "Dec",
                ],
              },
              in: {
                $arrayElemAt: ["$$monthsInString", "$month"],
              },
            },
          },
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      message: "Monthly usage statistics fetched successfully",
      data: monthlyStats,
    });
  } catch (error) {
    return next(error);
  }
};
