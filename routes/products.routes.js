const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const axios = require("axios");

router.get("/", (req, res, next) => {
  Product.find()
    .then((foundProduct) => {
      // console.log(createdProduct)
      res.json(foundProduct);
    })
    .catch((error) => {
      console.log("error creating kids product", error);
    });
});
router.get("/kids/boys", (req, res, next) => {
  Product.find({ categories: "boys" })
    .then((foundProduct) => {
      // console.log(createdProduct)
      res.json(foundProduct);
    })
    .catch((error) => {
      console.log("error creating kids product", error);
    });
});

router.get("/kids/girls", (req, res, next) => {
  Product.find({ categories: "girls" })
    .then((foundProduct) => {
      // console.log(createdProduct)
      res.json(foundProduct);
    })
    .catch((error) => {
      console.log("error creating kids product", error);
    });
});
   

router.get("/men", (req, res, next) => {
  Product.find({ categories: "men" })
    .then((foundProduct) => {
      // console.log(createdProduct)
      res.json(foundProduct);
    })
    .catch((error) => {
      console.log("error creating mens product", error);
    });
});

router.get("/women", (req,res,next)=>{
    Product.find({ categories: "women" })
    .then((foundProduct)=>{
        res.json(foundProduct);
    })
    .catch((error)=>{
        console.log("error finding womens product", error);
    });
});

router.get("/:id", (req,res,next) => {
    const productId = req.params.id;
    Product.findById(productId)
    .then((product)=>{
      res.json(product);
    })
.catch((error)=>{
  console.error("error getting product:", error)
})
})


module.exports = router;
