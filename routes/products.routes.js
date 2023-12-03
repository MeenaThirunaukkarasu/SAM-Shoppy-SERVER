const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const axios = require("axios");

router.get("/", (req, res, next) => {
  Product.find()
    .then((foundProduct) => {
      //  console.log(foundProduct)
      res.json(foundProduct);
    })
    .catch((error) => {
      console.log("error getting all products", error);
    });
});
router.get("/boys", (req, res, next) => {
  Product.find({ categories: "boys" })
    .then((foundProduct) => {
      // console.log(createdProduct)
      res.json(foundProduct);
    })
    .catch((error) => {
      console.log("error creating kids product", error);
    });
});

router.get("/girls", (req, res, next) => {
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
router.patch("/update/:id", (req,res,next) => {
    const productId = req.params.id;
    const action=req.body
    if(action==='add'){
    Product.findByIdAndUpdate(productId,{ $inc: { availability: -1 } },{new:true})
    .then((product)=>{
      res.json(product);
    })
    .catch((error)=>{
      console.error("error getting product:", error)
    })
  }  
 else if(action==='delete'){
    Product.findByIdAndUpdate(productId,{ $inc: { availability: +1 } },{new:true})
    .then((product)=>{
      res.json(product);
    })
    .catch((error)=>{
      console.error("error getting product:", error)
    })
  }  

})
router.delete('/delete/:id',(req,res,next)=>{
  const productId=req.params.id
  Product.findByIdAndDelete(productId)
  .then(response=>{
  console.log('product deleted successfully')
  res.json(response)
  })
  .catch(error=>{
    console.log('there was an issue deleting the product',error)
  })
  
  })

// router.post(`product`, (req, res) => {

//   const productData = req.body
//   Product.create(productData).then(newProduct => {
//     res.json(newProduct)
//   })

// })

router.post(`/add`, (req, res) => {

  const productData = req.body

  Product.create(productData).then(newProduct => {
    res.json(newProduct)
  })

})

module.exports = router;
