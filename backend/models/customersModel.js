const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const validator = require("validator");

const customerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})
customerSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('customer', customerSchema);