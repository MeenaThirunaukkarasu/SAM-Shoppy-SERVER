const express = require("express");
const { resolve } = require("path");
const router = express.Router();
// Replace if using a different env file or config
const env = require("dotenv").config({ path: "./.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

router.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

router.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

router.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

// const express = require("express");
// 
// const Cart = require("../models/Cart.model");
// const User = require("../models/User.model");
// const Order = require("../models/Order.model");
// const { Client } = require('square');

// const squareClient = new Client({
//   environment: 'sandbox', // or 'production'
//   accessToken: 'EAAAENb-aRCfGlemDbi_tS4UTAmcCDap14BovcFw4t4wJbp86RnT_FKoGhuMxd8m',
// });

// router.get("/", (req, res, next) => {
//     if (req.payload && req.payload.userId) {
//         Order.findById(req.payload.userId)
//         .then((order) => {
//           res.json(order);
//         });
//       } else {
//         res.status(400).send("Cart ID not found in the request payload.");
//       }
//     });

module.exports = router;

