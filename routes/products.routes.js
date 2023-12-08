const express = require("express");
const router = express.Router();
const Product = require("../models/Product.model");
const axios = require("axios");

router.get("/", (req, res, next) => {
  Product.find()
    .then((foundProduct) => {
      //  (foundProduct)
      res.json(foundProduct);
    })
    .catch((error) => {
      ("error getting all products", error);
    });
});
router.get("/boys", (req, res, next) => {
  Product.find({ categories: "boys" })
    .then((foundProduct) => {
      // (createdProduct)
      res.json(foundProduct);
    })
    .catch((error) => {
      ("error creating kids product", error);
    });
});

router.get("/girls", (req, res, next) => {
  Product.find({ categories: "girls" })
    .then((foundProduct) => {
      // (createdProduct)
      res.json(foundProduct);
    })
    .catch((error) => {
      ("error creating kids product", error);
    });
});

router.get("/men", (req, res, next) => {
  Product.find({ categories: "men" })
    .then((foundProduct) => {
      // (createdProduct)
      res.json(foundProduct);
    })
    .catch((error) => {
      ("error creating mens product", error);
    });
});

router.get("/women", (req, res, next) => {
  Product.find({ categories: "women" })
    .then((foundProduct) => {
      res.json(foundProduct);
    })
    .catch((error) => {
      ("error finding womens product", error);
    });
});

router.get("/:id", (req, res, next) => {
  const productId = req.params.id;
  Product.findById(productId)
    .then((product) => {
      res.json(product);
    })
    .catch((error) => {
      console.error("error getting product:", error);
    });
});

router.put("/update/:id", (req, res, next) => {
  const productId = req.params.id;
  const updateDetails = req.body;
  Product.findByIdAndUpdate(productId, updateDetails, { new: true })
    .then((product) => {
      ('product',product)
      res.json(product);
    })
    .catch((error) => {
      console.error("error getting product:", error);
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
        console.error("error getting product:", error);
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
        console.error("error getting product:", error);
      });
  }
});
router.delete("/delete/:id", (req, res, next) => {
  const productId = req.params.id;
  Product.findByIdAndDelete(productId)
    .then((response) => {
      ("product deleted successfully");
      res.json(response);
    })
    .catch((error) => {
      ("there was an issue deleting the product", error);
    });
});

// router.post(`product`, (req, res) => {

//   const productData = req.body
//   Product.create(productData).then(newProduct => {
//     res.json(newProduct)
//   })

// })

router.post("/add", (req, res) => {
  const productData = req.body;
  Product.create(productData).then((newProduct) => {
    res.json(newProduct);
  });
});

module.exports = router;
