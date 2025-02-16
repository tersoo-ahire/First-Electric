const express = require("express");
const router = express.Router();
const meter = require("./../controllers/paygoControllers/meter");
const payment = require("./../controllers/paygoControllers/payment");
const powerUsage = require("./../controllers/paygoControllers/powerUsage");
const auth = require("./../controllers/authController");
const {
  topupWithMonnify,
} = require("../controllers/paygoControllers/topupWithMonnify");
const {
  topupWithPaystack,
} = require("../controllers/paygoControllers/topupWithPaystack");
const {
  verifyPayer,
} = require("../webhooks/offline-payments/payerVerification");
const {
  paymentRequest,
} = require("../webhooks/offline-payments/paymentRequest");

// METERS
router
  .route("/meters")
  .post(auth.protect, auth.restrictTo("admin"), meter.createMeter)
  .get(auth.protect, auth.restrictTo("admin"), meter.getAllMeters);

router
  .route("/meters/:id")
  .patch(auth.protect, auth.restrictTo("admin"), meter.updateMeter)
  .delete(auth.protect, auth.restrictTo("admin"), meter.deleteMeter);

router.get("/meters/find", meter.getAMeter);
router.post("/meters/find", meter.getMemmcolMeter);

// PAYMENTS
router.post("/topup-with-paystack", topupWithPaystack);
router.post("/topup-with-monnify", topupWithMonnify);

router.route("/payments").get(payment.getAllPayments);

router.get("/payments/pending", payment.getPendingPayments);

router.post("/payments/mark-successful/:id", payment.markPaymentSuccessful);

module.exports = router;

// POWER USAGE
router
  .route("/power-usage")
  .post(powerUsage.createUsage)
  .get(powerUsage.getAllUsages);

router.get("/power-usage/annual-stats", powerUsage.usageAnnualStats);
router.get("/power-usage/monthly-stats", powerUsage.loanMonthlyStats);

// WEBHOOKS
router.post("/webhooks/verify-payer", verifyPayer);
router.post("/webhooks/payment-request", paymentRequest);
