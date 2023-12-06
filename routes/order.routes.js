const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Order = require("../models/Order.model");
const Cart=require('../models/Cart.model')
const Product=require('../models/Product.model')
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

router.patch("/update/:id", (req, res, next) => {
const orderId=req.params.id
  Order.findByIdAndUpdate(orderId,{ status: 'completed' }, { new: true })
    .then((order) => {
      res.json(order);
    })
    .catch(error=>{
      res.json('error updating status');

    })
});
// router.post("/create", async (req, res, next) => {
//   const { cart, user, overallTotal, deliveryAddress } = req.body;
//   console.log(deliveryAddress);
//   console.log("cart", cart.cartDetails);
//   Order.create({
//     user: user._id,
//     cartDetails: cart.cartDetails,
//     totalAmount: overallTotal,
//     deliveryAddress: deliveryAddress._id,
//   })
//     .then((createdOrder) => {
//       createdOrder.cartDetails.forEach(cart=>{
// const cartId=cart.product
//       return  Product.findByIdAndUpdate({cartId},{quantity:quantity-cart.quantity},{new:true})
//       })
//       .then(updatedProduct=>{
//         Cart.findByIdAndUpdate(cart._id,
//           { $set: { cartDetails: [] } }, 
//           { new: true })
//           .then(updatedCart=>{
//             res.json(createdOrder);
        
//           })
//       })

//     })
//     .catch((error) => {
//       console.log("error", error);
//     });
  
// });
router.post("/create", (req, res, next) => {
  const { cart, user, overallTotal, deliveryAddress } = req.body;

  Order.create({
    user: user._id,
    cartDetails: cart.cartDetails,
    totalAmount: overallTotal,
    deliveryAddress: deliveryAddress._id,
  })
    .then((createdOrder) => {
      console.log("Cart Details Length:", createdOrder.cartDetails.length);
console.log("Cart Details:", createdOrder.cartDetails);
const updateProductPromises = createdOrder.cartDetails.map((cartItem) => {
  const cartId = cartItem.product;
  const newQuantity = parseInt(cartItem.quantity, 10);

  // Assume 'availability' is a string field in your Product model
  return Product.findById(cartId).then((product) => {
    if (!product) {
      // Handle the case where the product is not found
      throw new Error("Product not found");
    }

    const currentAvailability = parseInt(product.availability, 10);

    // Calculate the new availability value
    const newAvailability = (currentAvailability - newQuantity).toString();

    // Update the product with the new availability value
    return Product.findByIdAndUpdate(
      cartId,
      { $set: { availability: newAvailability } }, // Set new availability
      { new: true }
    );
      });
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
          // Respond with the created order
          res.json(createdOrder);
        });
    })
    .catch((error) => {
      console.log("error", error);
      // Handle error appropriately, send an error response, or call the error handling middleware
      res.status(500).json({ error: "Internal Server Error" });
    });
});


module.exports = router;
