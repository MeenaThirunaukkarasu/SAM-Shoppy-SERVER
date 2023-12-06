const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Order = require("../models/Order.model");
const Cart = require("../models/Cart.model");
const Product = require("../models/Product.model");
const { Client } = require("square");

const squareClient = new Client({
  environment: "sandbox", // or 'production'
  accessToken:
    "EAAAENb-aRCfGlemDbi_tS4UTAmcCDap14BovcFw4t4wJbp86RnT_FKoGhuMxd8m",
});

const mailjet = require("node-mailjet").apiConnect(
  "c3ec2f57947960e5cd3464735cbc6ac1",
  "bf06d993a022b723f04df1866fd02d52"
);
const sendGeneralMail = function (mail, sub, msg) {
  return mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Name: "ST Hospital",
          Email: "sunithajosephine22@gmail.com",
        },
        To: [
          {
            Email: "sunithatheresa18@gmail.com",
            Name: "Sunitha",
          },
        ],
        Subject: sub,
        TextPart: msg,
      },
    ],
  });
};

router.get("/", (req, res, next) => {
  Order.find()
    .populate("user")
    .populate("cartDetails.product")
    .then((order) => {
      res.json(order);
    });
});

router.get("/:id", (req, res, next) => {
  const userId = req.params.id;
  Order.find({ user: userId })
    .populate("user")
    .populate("cartDetails.product")
    .then((order) => {
      res.json(order);
    });
});

router.patch("/update/:id", (req, res, next) => {
  const orderId = req.params.id;
  Order.findByIdAndUpdate(orderId, { status: "completed" }, { new: true })
    .then((order) => {
      res.json(order);
    })
    .catch((error) => {
      res.json("error updating status");
    });
});

router.post("/create", (req, res, next) => {
  const { cart, user, overallTotal, deliveryAddress } = req.body;

  Order.create({
    user: user._id,
    cartDetails: cart.cartDetails,
    totalAmount: overallTotal,
    deliveryAddress: deliveryAddress._id,
  })
    .then((createdOrder) => {
      // Fetch the populated user details
      return Order.findById(createdOrder._id).populate("user");
    })
    .then((populatedOrder) => {
      // Send email using the populated user details
      sendGeneralMail(
        `${populatedOrder.user.email}`,
        "Order Confirmation",
        `Hi ${populatedOrder.user.name}, you have placed an order on SAM Shoppy for ${populatedOrder.totalAmount}. For further details about your order, visit the website https://flourishing-halva-5e3584.netlify.app/`
      );

      // Update product availability and clear the cart
      const updateProductPromises = populatedOrder.cartDetails.map((cartItem) => {
        // ... (remaining code unchanged)
      });

      // Wait for all product updates to complete
      return Promise.all(updateProductPromises)
        .then(() => {
          // Clear the cart
          return Cart.findByIdAndUpdate(
            cart._id,
            { $set: { cartDetails: [] } },
            { new: true }
          );
        })
        .then((updatedCart) => {
          // Respond with the created and populated order
          res.json(populatedOrder);
        });
    })
    .catch((error) => {
      console.log("error", error);
      // Handle error appropriately, send an error response, or call the error handling middleware
      res.status(500).json({ error: "Internal Server Error" });
    });
});

module.exports = router;
