const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");

router.route("/").post(orderController.create).get(orderController.getOrders);

router.route("/:ref").get(orderController.fetchOrder);

router.route("/:id").patch(orderController.updateOrder);

router.get("/user-orders/:id", orderController.fetchCustomerOrders);

module.exports = router;
