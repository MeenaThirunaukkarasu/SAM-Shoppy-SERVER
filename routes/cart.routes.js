const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart.model");
const User = require("../models/User.model");
const axios = require("axios");

// -> localhost:5005/cart/:userId
router.get("/", (req, res, next) => {
  if (req.payload && req.payload.cartId) {
    Cart.findById(req.payload.cartId).populate('product')
    .then((cart) => {
      res.send(cart);
    });
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

// router.post("/add", (req, res, next) => {
//   const productId = req.body.productId;
//   console.log("ProductId received on the server:", productId)
//   Cart.findByIdAndUpdate(
//     req.payload.cartId,
//     { $push: { product: productId } },
//     { new: true }
//   )
//     .then((updatedCart) => {
//       res.json(updatedCart);
//     })
//     .catch((error) => {
//       console.log("error adding product to the cart", error);
//       res.status(500).send("Internal Server Error");
//     });
// });

router.post("/add", async (req, res, next) => {
  const productId = req.body.productId;

  try {
    let cart = await Cart.findById(req.payload.cartId);

    // If the cart doesn't exist, create a new one
    if (!cart) {
      cart = await Cart.create({ _id: req.payload.cartId, product: [productId] });
    } else {
      // If the cart exists, add the product
      cart = await Cart.findByIdAndUpdate(
        req.payload.cartId,
        { $push: { product: productId } },
        { new: true }
      );
    }

    res.json(cart);
  } catch (error) {
    console.log("Error adding product to the cart:", error);
    res.status(500).send("Internal Server Error");
  }
});


router.delete("/deleteProduct/:id", (req, res, next) => {
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
router.delete("/delete/:id", (req, res, next) => {
  const productId = req.params.id;

  Cart.findById(req.payload.cartId)
    .then((cart) => {
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      // Find the index of the product in the array
      const productIndex = cart.product.indexOf(productId);

      // If the product is found, remove it
      if (productIndex !== -1) {
        cart.product.splice(productIndex, 1);

        // Save the changes to the database
        return cart.save();
      } else {
        // Product not found in the cart
        return Promise.resolve(cart);
      }
    })
    .then((updatedCart) => {
      res.json(updatedCart);
    })
    .catch((error) => {
      console.log("Error deleting product from the cart", error);
      res.status(500).send("Internal Server Error");
    });
});

module.exports = router;
