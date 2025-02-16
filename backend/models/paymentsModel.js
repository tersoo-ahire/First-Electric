const mongoose = require('mongoose');
const mongoosePaginate = require("mongoose-paginate-v2");

const paymentSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        required: true
    },

    reference: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['success', 'failed']
    }
},{
    timestamps: true
})
paymentSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Payments', paymentSchema);