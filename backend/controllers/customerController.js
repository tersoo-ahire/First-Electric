const Customer = require('../models/customersModel');
const Order = require('../models/orderModel');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

exports.getAllCustomers = async(req, res, next) => {
    try {
        const customLabels = {
            docs: "customers"
        };
        const options = {
            page: req.query.page,
            limit: req.query.perPage,
            sort: { createdAt: -1 },
            customLabels,
            collation: {
              locale: "en"
            },
            populate: 'category'
          };
        Customer.paginate({}, options, (err, customers) => {
            res.status(200).json({
                status: 'success',
                data: {...customers}
            })
        });
    } catch (error) {
        return next(error);
    }
}