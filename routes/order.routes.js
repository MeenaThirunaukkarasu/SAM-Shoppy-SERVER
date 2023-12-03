const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Order = require("../models/Order.model");
const { Client } = require('square');

const squareClient = new Client({
  environment: 'sandbox', // or 'production'
  accessToken: 'EAAAENb-aRCfGlemDbi_tS4UTAmcCDap14BovcFw4t4wJbp86RnT_FKoGhuMxd8m',
});

router.get("/", (req, res, next) => {
    // if (req.payload && req.payload.userId) {
    //     Order.findById(req.payload.userId)
    //     .then((order) => {
    //       res.json(order);
    //     });
    //   } else {
    //     res.status(400).send("Cart ID not found in the request payload.");
    //   }
    });

    router.post("/create", async (req, res, next) => {
      // const { cartDetails } = req.body;
      // // console.log(req.payload);
      // console.log(req.body);
      console.log(req.body);
      let ordercreate;

      // // console.log(req.body);

      // const { cart } = req.body.cart;
      // console.log(cart);
      // console.log(req.body.cartDetails);
      try {
        let OrderExistForCart = await Order.findOne({cart:req.body.cart._id}).populate('cart');
        console.log(OrderExistForCart);
        // If the cart doesn't exist, create a new one
        if (!OrderExistForCart) {
           console.log("Create order initiated")
           ordercreate = await Order.create({ user: req.body.user._id, cart: req.body.cart._id, totalAmount: req.body.overallTotal, deliveryAddress: req.boby.deliveryAddress._id});
        } 
        // Save the updated cart
        // ordercreate = await ordercreate.save();
        console.log(ordercreate);  
        res.json(ordercreate);
      } catch (error) {
        console.log("Error adding product to the cart:", error);
        res.status(500).send("Internal Server Error");
      }
    

    })
module.exports = router;
