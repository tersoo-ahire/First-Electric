const Payment = require("../models/paymentsModel");
const Order = require("../models/orderModel");
const Customer = require("../models/customersModel");
const Product = require("../models/productModel");
const _ = require("underscore");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const axios = require("axios").default;
const sendMail = require("../utils/email");

const generate_order_ref = (size = 6, alpha = true) => {
  let characters = alpha
    ? "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    : "0123456789";
  characters = characters.split("");
  let selections = "";
  for (let i = 0; i < size; i++) {
    let index = Math.floor(Math.random() * characters.length);
    selections += characters[index];
    characters.splice(index, 1);
  }
  return selections;
};

const convertCurrency = (amount) => {
  if (isNaN(amount)) {
    return amount;
  }

  // Convert the value
  convertedAmount = parseFloat(amount.toString().replace(/,/g, ""))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return convertedAmount;
};

exports.create = async (req, res, next) => {
  try {
    const customerData = _.pick(req.body, [
      "firstname",
      "lastname",
      "email",
      "phone",
    ]);
    let customer = await Customer.findOneAndUpdate(
      { email: customerData.email },
      customerData,
      { new: true }
    );
    if (!customer) customer = await Customer.create(customerData);

    let { reference, total, products } = req.body;

    const response = await verifyTransaction(reference, next);

    let paymentData = {
      amount: total,
      customer: customer._id,
      reference,
    };

    if (response.data.data.status) {
      console.log("Payment Success");
      paymentData.status = "success";
      Promise.all(
        products.map(async (item) => {
          const product = await Product.findById(item.product);
          let available = product.available;
          let bal = product.stock - item.quantity;
          if (bal <= 0) available = false;
          let orders = product.totalOrders + item.quantity;
          await Product.updateOne(
            { _id: product._id },
            { stock: bal, available: available, totalOrders: orders }
          );
        })
      );
      const payment = await Payment.create(paymentData);
      res.status(200).json({
        status: "payment success",
        data: payment,
      });
      let orderData = _.pick(req.body, [
        "subTotal",
        "vat",
        "delivery",
        "address",
        "city",
        "state",
        "additionalInfo",
      ]);

      let ref = generate_order_ref(6, true);

      orderData.user = customer._id;
      orderData.ref = ref;
      orderData.amount = total;
      orderData.products = products;
      let order = await Order.create(orderData);
      let msgOptions = {
        from: "First Electric Store <info@firstelectricco.com>",
        email: customer.email,
        subject: "Order Successfully Created",
        message: `<p>Hello ${customer.firstname}</p>
                <p>Your order was successfully created. Your order details are;</p>
                <ul>
                    <li>Order Amount: ₦${convertCurrency(total)}</li>
                    <li>Order Reference: ${ref}</li>
                </ul>

                <p>Kindly click <a href="https://firstelectricco.com/shop/orders/${
                  customer._id
                }">here</a> to access your order details </p>

                <p>In case you are unable to access the above link, you can copy and paste the following into your browser: https://firstelectricco.com/shop/orders/${
                  customer._id
                }</p>

                <p>Thanks for shopping with us.</p>
                `,
      };
      sendMail(msgOptions)
        .then((res) => {
          console.log("Mail sent successfully to customer");
        })
        .catch((error) => {
          console.log("Error sending mail to customer", error);
        });
    } else {
      console.log("payment failed");
      paymentData.status = "failed";
      await Payment.create(paymentData);
      return next(new AppError("Payment Failed", 406));
    }
  } catch (error) {
    return next(error);
  }
};

const verifyTransaction = async (ref, next) => {
  try {
    const response = await axios.request({
      url: "https://api.paystack.co/transaction/verify/" + ref,
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
      },
    });
    return response;
  } catch (error) {
    console.log("error", error.response.status);
    return next(
      new AppError(error.response.data.message, error.response.status)
    );
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const customLabels = {
      docs: "orders",
    };
    const options = {
      page: req.query.page,
      limit: req.query.perPage,
      sort: { createdAt: -1 },
      customLabels,
      collation: {
        locale: "en",
      },
      populate: "user",
    };
    Order.paginate({}, options, (err, orders) => {
      res.status(200).json({
        status: "success",
        data: { ...orders },
      });
    });
  } catch (error) {
    return next(error);
  }
};

exports.fetchCustomerOrders = async (req, res, next) => {
  try {
    await Order.find({ user: req.params.id })
      .populate("user products.product")
      .sort({ createdAt: "descending" })
      .exec(function (err, orders) {
        res.status(200).json({
          status: "success",
          data: orders,
        });
      });
  } catch (error) {
    return next(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    let { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: status },
      { new: true }
    ).populate("user");
    if (!order) return next(new AppError("Order not found", 404));

    res.status(200).json({
      status: "success",
      data: order,
    });

    let msgOptions = {
      from: "First Electric Store <info@firstelectricco.com>",
      email: order.user.email,
    };

    if (status === "packaged") {
      msgOptions.subject = "Order Successfully Packaged";
      msgOptions.message = `<p>Hello ${order.user.firstname}</p>
            <p>Your order was successfully packaged and is ready for shipping. Your order details are:</p>
            <ul>
                <li>Order Amount: ₦${convertCurrency(order.amount)}</li>
                <li>Order Reference: ${order.ref}</li>
            </ul>

            <p>Kindly click <a href="https://firstelectricco.com/shop/orders/${
              order.user._id
            }">here</a> to access your order details </p>

            <p>In case you are unable to access the above link, you can copy and paste the following into your browser: https://firstelectricco.com/shop/orders/${
              order.user._id
            }</p>

            <p>Thank you for shopping with us.</p>
            `;
      sendMail(msgOptions)
        .then(() => console.log("Order update sent to customer"))
        .catch((err) => console.log("Error sending order update", err));
    } else if (status === "shipped") {
      msgOptions.subject = "Order Successfully Shipped";
      msgOptions.message = `<p>Hello ${order.user.firstname}</p>
            <p>Your order was successfully shipped and should arrive in 3-5 days. Your order details are:</p>
            <ul>
                <li>Order Amount: ₦${convertCurrency(order.amount)}</li>
                <li>Order Reference: ${order.ref}</li>
            </ul>

            <p>Kindly click <a href="https://firstelectricco.com/shop/orders/${
              order.user._id
            }">here</a> to access your order details </p>

            <p>In case you are unable to access the above link, you can copy and paste the following into your browser: https://firstelectricco.com/shop/orders/${
              order.user._id
            }</p>

            <p>Thank you for shopping with us.</p>
            `;
      sendMail(msgOptions)
        .then(() => console.log("Order update sent to customer"))
        .catch((err) => console.log("Error sending order update", err));
    } else if (status === "delivered") {
      msgOptions.subject = "Order Successfully Delivered";
      msgOptions.message = `<p>Hello ${order.user.firstname}</p>
            <p>Your order was successfully delivered.</p>

            <p>Kindly click <a href="https://firstelectricco.com/shop/orders/${order.user._id}">here</a> to access your order details </p>

            <p>In case you are unable to access the above link, you can copy and paste the following into your browser: https://firstelectricco.com/shop/orders/${order.user._id}</p>
            
            <p>Thank you for shopping with us.</p>
            `;
      sendMail(msgOptions)
        .then(() => console.log("Order update sent to customer"))
        .catch((err) => console.log("Error sending order update", err));
    }
  } catch (error) {
    return next(error);
  }
};

exports.fetchOrder = async (req, res, next) => {
  try {
    const order = await Order.findOne({
      ref: req.params.ref,
    }).populate("user products.product");
    if (!order) return next(new AppError("Order not found", 404));
    res.status(200).json({
      status: "success",
      data: order,
    });
  } catch (error) {
    return next(error);
  }
};
