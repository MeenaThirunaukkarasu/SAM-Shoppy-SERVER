const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const axios = require("axios");

router.get("/", (req, res, next) => {
  Product.find()
    .then((foundProduct) => {
      
      res.json(foundProduct);
    })
    .catch((error) => {
    
    });
});
router.get("/boys", (req, res, next) => {
  Product.find({ categories: "boys" })
    .then((foundProduct) => {
      
      res.json(foundProduct);
    })
    .catch((error) => {
      
    });
});

router.get("/girls", (req, res, next) => {
  Product.find({ categories: "girls" })
    .then((foundProduct) => {
     
      res.json(foundProduct);
    })
    .catch((error) => {
    
    });
});

router.get("/men", (req, res, next) => {
  Product.find({ categories: "men" })
    .then((foundProduct) => {
      
      res.json(foundProduct);
    })
    .catch((error) => {
     
    });
});

router.get("/women", (req, res, next) => {
  Product.find({ categories: "women" })
    .then((foundProduct) => {
      res.json(foundProduct);
    })
    .catch((error) => {
     
    });
});

router.get("/:id", (req, res, next) => {
  const productId = req.params.id;
  Product.findById(productId)
    .then((product) => {
      res.json(product);
    })
    .catch((error) => {
    
    });
});

router.put("/update/:id", (req, res, next) => {
  const productId = req.params.id;
  const updateDetails = req.body;
  Product.findByIdAndUpdate(productId, updateDetails, { new: true })
    .then((product) => {
      res.json(product);
    })
    .catch((error) => {
     
    });
});

router.patch("/update/:id", (req, res, next) => {
  const productId = req.params.id;
  const action = req.body;
  if (action === "add") {
    Product.findByIdAndUpdate(
      productId,
      { $inc: { availability: -1 } },
      { new: true }
    )
      .then((product) => {
        res.json(product);
      })
      .catch((error) => {
      });
  } else if (action === "delete") {
    Product.findByIdAndUpdate(
      productId,
      { $inc: { availability: +1 } },
      { new: true }
    )
      .then((product) => {
        res.json(product);
      })
      .catch((error) => {
      });
  }
});
router.delete("/delete/:id", (req, res, next) => {
  const productId = req.params.id;
  Product.findByIdAndDelete(productId)
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
    });
});

router.post("/add", (req, res) => {
  const productData = req.body;
  Product.create(productData).then((newProduct) => {
    res.json(newProduct);
  });
});

module.exports = router;
