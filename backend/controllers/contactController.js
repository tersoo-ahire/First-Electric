const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const sendEmail = require("./../utils/email");


exports.sendInquiry = catchAsync(async (req, res, next) => {
  var message =
    "<html>\n <body>\n <h2>Inquiry from " +
    req.body.name +
    "</h2>\n <table>\n<tr>\n <td><b>Name: </b></td>" +
    req.body.name +
    "<td></td>\n </tr>\n <tr>\n <td><b>Email: </b></td><td>" +
    req.body.email +
    "</td>\n </tr>\n <tr>\n <td><b>Phone Number: </b></td>" +
    req.body.phone +
    "<td></td>\n </tr>\n <tr>\n <td><b>Message: </b></td>" +
    req.body.message +
    "<td></td>\n </tr>\n </table></body></html>";

  try {
    await sendEmail({
      from: req.body.name + " " + "<" + req.body.email + ">",
      email: "info@firstelectricco.com",
      replyTo: req.body.email,
      subject: "Inquiry from" + " " + req.body.name,
      message
    });

    res.status(200).json({
      status: "success",
      message: "Email sent successfully"
    });
  } catch (err) {
    console.log(err)

    return next(
      new AppError(
        "An error occured while sending your inquiry. Please try again later"
      ),
      500
    );
  }
});
