const express = require("express");
const referralController = require("./../controllers/referralController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    referralController.getAllReferees
  )
  .post(referralController.register);

router
  .route("/:referralCode")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    referralController.getReferee
  );
//   .patch(
//     authController.protect,
//     authController.restrictTo("admin"),
//     referralController.updateSubscriber
//   )
//   .delete(
//     authController.protect,
//     authController.restrictTo("admin"),
//     referralController.deleteSubscriber
  // );

module.exports = router;
