const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const meterSchema = new mongoose.Schema(
  {
    meterNumber: {
      type: String,
      required: [true, "Meter number is required"],
    },

    meterName: {
      type: String,
      required: [true, "Meter name is required"],
    },

    address: "String",

    email: {
      type: "String",
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    meterTariff: Number
  },
  {
    timestamps: true,
  }
);

meterSchema.plugin(paginate);
meterSchema.index({
  meterNumber: "text",
  meterName: "text",
  email: "text",
  phone: "text",
});
module.exports = mongoose.model("Meter", meterSchema);