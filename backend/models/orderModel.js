const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      required: true,
    },

    ref: {
      type: String,
      required: true
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },

        quantity: Number,
      },
    ],

    vat: Number,

    delivery: Number,

    subTotal: Number,

    amount: {
      type: Number,
      required: true,
    },

    additionalInfo: String,

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["processing", "packaged", "shipped", "delivered"],
      default: "processing",
    },
  },
  {
    timestamps: true,
  }
);
orderSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Order', orderSchema)