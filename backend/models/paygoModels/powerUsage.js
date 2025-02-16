const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const powerSchema = new mongoose.Schema(
  {
    meterNumber: {
      type: String,
      required: [true, "Meter number is required"],
    },

    powerConsumed: {
      type: Number,
      required: [true, "Power consumed is required"],
    },

    remainingCredit: {
      type: Number,
      required: [true, "Remaining credit is required"],
    },

    loggedDate: {
      type: Date,
      required: [true, "Date is required"],
    },
  },
  {
    timestamps: true,
  }
);

powerSchema.plugin(paginate);
powerSchema.index({
  meterNumber: "text",
});
module.exports = mongoose.model("PowerUsage", powerSchema);