const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide your email address"],
      lowercase: true
    }
  },
  { timestamps: true }
);

subscriberSchema.plugin(mongoosePaginate)
const Subscriber = mongoose.model("Subscriber", subscriberSchema);

module.exports = Subscriber;
