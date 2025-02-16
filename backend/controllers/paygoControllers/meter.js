const { default: Axios } = require("axios");
const Meter = require("../../models/paygoModels/meter");
const AppError = require("../../utils/appError");

exports.createMeter = async (req, res, next) => {
  try {
const isMeterExist = await Meter.findOne({meterNumber: req.body.meterNumber})

    if (isMeterExist) {
      return next(new AppError("Meter already exists", 400));
    }

    const meter = await Meter.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Meter created successfully",
      data: meter,
    });
  } catch (error) {
    ``;
    console.log(error);
    return next(error);
  }
};

exports.getAllMeters = async (req, res, next) => {
  try {
    const customLabels = {
      docs: "meters",
    };
    let options = {
      pagination: false,
      customLabels,
      sort: { createdAt: -1 },
    };

    if (req.query.perPage || req.query.page) {
      options = {
        page: req.query.page || 1,
        limit: req.query.perPage || 20,
        sort: { createdAt: -1 },
        customLabels,
        collation: {
          locale: "en",
        },
      };
    }

    Meter.paginate({}, options, (err, meters) => {
      return res.status(200).json({
        status: "success",
        message: "Meters fetched successfully",
        data: { ...meters },
      });
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.getAMeter = async (req, res, next) => {
  try {
    const meter = await Meter.findOne({ meterNumber: req.query.meterNumber });
    if (!meter)
      return next(new AppError("Sorry, this meter does not exist", 404));

    res.status(200).json({
      status: "success",
      message: "Meter fetched successfully",
      data: meter,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.updateMeter = async (req, res, next) => {
  try {
    const meter = await Meter.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!meter)
      return next(new AppError("Sorry, this meter does not exist", 404));
    
    res.status(200).json({
      status: 'success',
      message: 'Meter information updated successfully',
      data: meter
    })
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.deleteMeter = async (req, res, next) => {
  try {
    const meter = await Meter.findByIdAndDelete(req.params.id);
    if (!meter) return next(new AppError("Sorry, this meter does not exist", 404));

    res.status(204).json({
      status: "success",
      message: "Meter deleted successfully",
      data: null,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getMemmcolMeter = async (req, res, next) => {
  try {
    const memmcolURL = `${process.env.MEMMCOL_API}/IdentificationV2/${process.env.MEMMCOL_MERCHANT_ID}/${req.body.meterNo}`
    console.log('Memmcol URL', memmcolURL)

    const response = await Axios.request({
      url: memmcolURL,
      method: "GET",
    });

    console.log('Memmcol response', response)

    const meter = await Meter.findOne({ meterNumber: req.body.meterNo });
    if (!meter)
      return next(new AppError("Sorry, this meter does not exist", 404));

    resData = {
      memmcol: response.data,
      paygo: meter
    }

    res.status(200).json({
      status: "success",
      message: "Meter information fetched successfully",
      data: resData,
    });
  } catch (error) {
    return next(error);
  }
}