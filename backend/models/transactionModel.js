const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    txRef: {
      type: String,
      required: true
    },

    customerName: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    commission: {
      type: Number,
      required: true
    },

    refereeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Referral"
    }
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
