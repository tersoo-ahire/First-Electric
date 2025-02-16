const express = require("express");
const subscriberController = require("./../controllers/subscriberController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    subscriberController.getAllSubscribers
  )
  .post(subscriberController.createSubscriber);

  router
    .route("/paginate")
    .get(
      authController.protect,
      authController.restrictTo("admin"),
      subscriberController.getAllPaginatedSubscribers
    );

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    subscriberController.getSubscriber
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    subscriberController.updateSubscriber
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    subscriberController.deleteSubscriber
  );

module.exports = router;
