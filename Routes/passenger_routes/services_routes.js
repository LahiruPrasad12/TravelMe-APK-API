const services = require("../../Controllers/passenger_controller/services_controller");
const authController = require("../../Controllers/auth_controller");
const express = require("express");
const router = express.Router();


router.route("/")
    .get(authController.protect,services.allServices)
    // .put(services.updateShippingItem)
    // .post(authController.protect,services.update_shipping_state)

// router.route("/:id")
//     .get(authController.protect,services.getItem)
//     .put(services.updateShippingItem)

module.exports = router;
