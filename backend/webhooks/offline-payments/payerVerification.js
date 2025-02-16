const Meter = require("../../models/paygoModels/meter");

exports.verifyPayer = async (req, res, next) => {
  try {
    console.log(req.body)

    const meter = await Meter.findOne({ meterNumber: req.body.paymentRecipientId });
    if (!meter)
      return res.status(200).json({
        responseCode: "02",
        responseMessage: "User does not exist."
      })
    
    console.log(`Monnify offline payment verified a meter with the number ${meter.meterNumber} and name ${meter.meterName}`)

    res.status(200).json({
      responseCode: "00",
      responseMessage: "User details retrieved successfully.",
      paymentRecipientId: meter.meterNumber,
      paymentRecipientDescription: meter.meterName
    });
  } catch (error) {
    return next(error);
  }
}