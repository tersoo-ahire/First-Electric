const mongoose = require("mongoose");
const URLSlugs = require('mongoose-url-slugs');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: String
})
categorySchema.plugin(URLSlugs('name'));
module.exports = mongoose.model('Category', categorySchema);