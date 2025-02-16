const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const topupSchema = new mongoose.Schema(
  {
    meterNo: String,
    amount: Number,
    modeOfPayment: {
      type: String,
      default: "card",
    },
    topupStatus: String,
    reference: String,
    gatewayStatus: String,
  },
  { timestamps: true }
);

topupSchema.plugin(paginate);
module.exports = mongoose.model("Topups", topupSchema);
