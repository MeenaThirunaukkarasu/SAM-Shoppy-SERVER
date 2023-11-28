const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart.model");
const User = require("../models/User.model");
const Order = require("../models/Order.model");
const { Client } = require('square');

const squareClient = new Client({
  environment: 'sandbox', // or 'production'
  accessToken: 'EAAAENb-aRCfGlemDbi_tS4UTAmcCDap14BovcFw4t4wJbp86RnT_FKoGhuMxd8m',
});

router.get("/", (req, res, next) => {
    if (req.payload && req.payload.userId) {
        Order.findById(req.payload.userId)
        .then((order) => {
          res.json(order);
        });
      } else {
        res.status(400).send("Cart ID not found in the request payload.");
      }
    });

module.exports = router;
