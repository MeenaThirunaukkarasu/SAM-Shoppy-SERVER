const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Order = require("../models/Order.model");
const Cart=require('../models/Cart.model')
const { Client } = require("square");

const squareClient = new Client({
  environment: "sandbox", // or 'production'
  accessToken:
    "EAAAENb-aRCfGlemDbi_tS4UTAmcCDap14BovcFw4t4wJbp86RnT_FKoGhuMxd8m",
});

router.get("/", (req, res, next) => {
  Order.find()
    .populate("user")
    .populate('cartDetails.product')
    .then((order) => {
      res.json(order);
    });
});
router.get("/:id", (req, res, next) => {
const userId=req.params.id
  Order.find({user:userId})
    .populate("user")
    .populate('cartDetails.product')
    .then((order) => {
      res.json(order);
    });
});
router.post("/create", async (req, res, next) => {
  const { cart, user, overallTotal, deliveryAddress } = req.body;
  console.log(deliveryAddress);
  console.log("cart", cart.cartDetails);
  Order.create({
    user: user._id,
    cartDetails: cart.cartDetails,
    totalAmount: overallTotal,
    deliveryAddress: deliveryAddress._id,
  })
    .then((createdOrder) => {
Cart.findByIdAndUpdate(cart._id,
  { $set: { cartDetails: [] } }, 
  { new: true })
  .then(updatedCart=>{
    res.json(createdOrder);

  })
    })
    .catch((error) => {
      console.log("error", error);
    });
  
});
module.exports = router;
