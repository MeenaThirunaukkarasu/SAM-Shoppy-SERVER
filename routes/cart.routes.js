const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart.model");
const User = require("../models/User.model");
const axios = require("axios");

// -> localhost:5005/cart/:userId
router.get("/", (req, res, next) => {

  // logout, login, see this cartId
  // make sure all the calls to Cart target this cartId
//  console.log("hello")
//   console.log(req.payload)
//   res.send(req.payload.cartId)
if (req.payload && req.payload.cartId) {
  res.send(req.payload.cartId);
} else {
  res.status(400).send("Cart ID not found in the request payload.");
}
});


/*
1) In post route below, instead of replacing product ID for Cart "product" value, ADD to array of "product"
2) In delete route below, instead of deleting the whole Cart, only delete its contents ("product" variable)
2.5) Make sure this is reflected in cart.context.jsx in DeleteProduct function

SO idea is NOT to delete the whole cart each time a product is removed, also not to CREATE a new cart when product is added.
- Product added: Add to "product" variable of Cart model
- Product removed: Remove from "product" variable of Cart model
*/



router.post("/add", (req, res, next) => {
  const productId = req.body.productId;
  Cart.findByIdAndUpdate(
    req.payload.cartId,
    { $push: { product: productId } },
    { new: true }
  )
    .then((updatedCart) => {
      res.json(updatedCart);
    })
    .catch((error) => {
      console.log("error adding product to the cart", error);
      res.status(500).send("Internal Server Error");
    });
});

router.delete("/delete/:id", (req, res, next) => {
  const productId = req.params.id;
  Cart.findByIdAndUpdate(
    req.payload.cartId,
    { $pull: { product: productId } },
    { new: true }
  )
    .then((updatedCart) => {
      res.json(updatedCart);
    })
    .catch((error) => {
      console.log("error deleting product from the cart", error);
      res.status(500).send("Internal Server Error");
    });
});
module.exports = router;
