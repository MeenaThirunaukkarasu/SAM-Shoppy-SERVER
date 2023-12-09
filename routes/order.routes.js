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
          Name: "SAM Shoppy",
          Email: "meena.thirunau@gmail.com",
        },
        To: [
          {
            Email: `${mail}`,
            Name: "ADMIN",
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


router.post("/create", async (req, res, next) => {
  try {
    const { cart, user, overallTotal, deliveryAddress } = req.body;

    // Create order
    const createdOrder = await Order.create({
      user: user._id,
      cartDetails: cart.cartDetails,
      totalAmount: overallTotal,
      deliveryAddress: deliveryAddress._id,
    });

    // Fetch the populated user details
    const populatedOrder = await Order.findById(createdOrder._id).populate("user");

    // Send email using the populated user details
    await sendGeneralMail(
      `${populatedOrder.user.email}`,
      "Order Confirmation",
      `Hi ${populatedOrder.user.name}, you have placed an order on SAM Shoppy for $ ${populatedOrder.totalAmount}. For further details about your order, visit the website https://flourishing-halva-5e3584.netlify.app/`
    );
    ('Mail sent successfully');

    // Update product availability
    const updateProductPromises = populatedOrder.cartDetails.map(async (cartItem) => {
      const cartId = cartItem.product;
      const quantity = parseInt(cartItem.quantity, 10);

      // Fetch the current product
      const product = await Product.findById(cartId);

      if (!product) {
        // Handle the case where the product is not found
        throw new Error("Product not found");
      }

      const currentAvailability = parseInt(product.availability, 10);
      const newAvailability = (
        currentAvailability - quantity
      ).toString();

      // Update product quantity
      return Product.findByIdAndUpdate(
        cartId,
        { $set: { availability: newAvailability } },
        { new: true }
      );
    });

    // Wait for all product updates to complete
    await Promise.all(updateProductPromises);

    // Clear the cart
    const updatedCart = await Cart.findByIdAndUpdate(
      cart._id,
      { $set: { cartDetails: [] } },
      { new: true }
    );

    // Respond with the created and populated order
    ('Updated cart', updatedCart);
    res.json(populatedOrder);
  } catch (error) {
    // Handle error appropriately, send an error response, or call the error handling middleware
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
