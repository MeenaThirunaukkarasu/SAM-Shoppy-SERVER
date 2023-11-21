const express = require("express");
const router  = express.Router();
const Cart = require("../models/Cart.model");
const axios =  require("axios");

router.get("/",(req, res, next) => {
    Cart.find()
    .populate('product')
    .then((product) => {
        res.json(product);
    })
    .catch((error) => {
        console.log("error adding products to the cart", error);
    });
});
router.post("/add",(req, res, next) => {
    const productId=req.body.productId
    console.log(productId)
    Cart.create({product:productId})
        .then((createdCart) => {
          res.json(createdCart);
        })
        .catch((error) => {
          console.log("error adding product to the cart", error);
        });
})
router.delete("/delete/:id",(req, res, next) => {
  const productId=req.params.id
  console.log(productId)
  Cart.findOneAndDelete({product:productId})
      .then((deletedCart) => {
        res.json(deletedCart);
      })
      .catch((error) => {
        console.log("error deleting product to the cart", error);
      });
})


module.exports = router;
