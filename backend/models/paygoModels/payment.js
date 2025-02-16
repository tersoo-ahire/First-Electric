const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const paymentSchema = new mongoose.Schema(
  {
    meter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meter",
      required: true,
    },
    amount: Number,
    modeOfPayment: {
      type: String,
      default: "card",
    },
    topupStatus: String,
    paymentReference: String,
    transactionReference: String,
    paymentStatus: String,
    paymentGatewayMessage: String,
    paymentSource: {
      type: String,
      default: "online",
    },
    token: String,
    customer: Object,
  },
  { timestamps: true }
);

paymentSchema.plugin(paginate);
module.exports = mongoose.model("PaygoPayments", paymentSchema);
