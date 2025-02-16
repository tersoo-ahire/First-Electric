const express = require("express");
const cartController = require('../controllers/cartController');


const router = express.Router();

router.route('/')
    .get(cartController.fetchMyCart)
    .patch(cartController.updateCart)

module.exports = router;