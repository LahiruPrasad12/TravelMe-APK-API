const payment = require("../../Controllers/passenger_controller/make_payment_controller");
const express = require("express");
const router = express.Router();


router.route("/")
  .post(payment.makeUserPayment)


module.exports = router;
