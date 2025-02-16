const mongoose = require("mongoose");
// const mongoolia = require('mongoolia').default;
const URLSlugs = require('mongoose-url-slugs');
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        algoliaIndex: true
    },

    objectID: String,
    

    images: [
        {
            imageURL: String,
            publicId: String
        }
    ],

    thumbnail: String,

    description: {
        type: String,
        required: true,
        algoliaIndex: true
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },

    weight: Number,

    overview: String,

    stock: Number,

    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },

    price: {
        type: Number,
        required: true
    },

    available: Boolean,

    featured: {
        type: Boolean,
        default: false
    },

    totalOrders: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

productSchema.plugin(mongoosePaginate);
productSchema.plugin(URLSlugs('name'));
// productSchema.plugin(mongoolia, {
//     appId: 'ISUK75S5CD',
//     apiKey: process.env.ALGOLIA_API_KEY,
//     indexName: 'dev_PRODUCTS'
// })

module.exports = mongoose.model('Product', productSchema);