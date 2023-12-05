const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart.model");
const User = require("../models/User.model");

// -> localhost:5005/cart/:userId
router.get("/", (req, res, next) => {
  if (req.payload && req.payload.cartId) {
    Cart.findById(req.payload.cartId).populate('cartDetails.product')
    .then((cart) => {
      res.send(cart);
    });
  } else {
    res.status(400).send("Cart ID not found in the request payload.");
  }
});

router.post("/add", async (req, res, next) => {
  const { cartDetails } = req.body;
  try {
    let cart = await Cart.findById(req.payload.cartId).populate('cartDetails.product');

    // If the cart doesn't exist, create a new one
    if (!cart) {
      cart = await Cart.create({ _id: req.payload.cartId, user: cartDetails.user, cartDetails: [cartDetails] });
    } else {
      // If the cart exists, check if the product with the same size already exists
      const existingProductIndex = cart.cartDetails.findIndex((item) => {
        return (
          item.product._id.equals(cartDetails.product) &&
          item.size === cartDetails.size
        );
      });

      if (existingProductIndex !== -1) {
        // If the product with the same size exists, update the quantity or other details
       cart.cartDetails[existingProductIndex].quantity ++
      } else {
        // If the product with the same size doesn't exist, add a new entry
        cart.cartDetails.push(  {
          product: cartDetails.product,
          size: cartDetails.size,
          quantity: cartDetails.quantity
        });
      }

      // Save the updated cart
      cart = await cart.save();
    }

    res.json(cart);
  } catch (error) {
    console.log("Error adding product to the cart:", error);
    res.status(500).send("Internal Server Error");
  }
});




router.delete("/deleteProduct/:id", (req, res, next) => {
  const productId = req.params.id;
  const size = req.body.size;
  console.log('size',size)
  Cart.findByIdAndUpdate(
    req.payload.cartId,
    { $pull: { "cartDetails": {
      product: productId,
      size: size 
    } } },
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
router.delete("/delete/:id", async (req, res, next) => {
  const productId = req.params.id;
  const size = req.query.size;

  try {
    let cart = await Cart.findById(req.payload.cartId);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.cartDetails.findIndex(
      (item) => item.product == productId && item.size == size
    );

    if (productIndex !== -1) {
      const productToRemove = cart.cartDetails[productIndex];

      // If the product quantity is greater than 1, decrement the quantity
      if (productToRemove.quantity > 1) {
        productToRemove.quantity -= 1;
      } else {
        // If the quantity is 1, remove the entire entry
        cart.cartDetails.splice(productIndex, 1);
      }

      // Save the changes to the database
      cart = await cart.save();
    }

    res.json(cart);
  } catch (error) {
    console.log("Error deleting product from the cart", error);
    res.status(500).send("Internal Server Error");
  }
});



module.exports = router;
