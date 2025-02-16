const express = require("express");
const transactionController = require("./../controllers/transactionController");
const authController = require("./../controllers/authController");

const router = express.Router();
router.get("/payments", transactionController.getPayments);
router.route("/").post(transactionController.createTransaction);

router
  .route("/:refereeId")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    transactionController.getTransactions
  );

module.exports = router;
