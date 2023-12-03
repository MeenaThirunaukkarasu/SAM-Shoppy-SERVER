const express = require("express");
const router = express.Router();
const Address = require("../models/Address.model");
router.get("/", (req, res, next) => {
  Address.find().then((response) => {
    res.json(response);
  });
});

router.get("/:id", (req, res, next) => {
    const userId=req.params.id
  Address.findOne({user:userId})
  .then((response) => {
    res.json(response);
  });
});

router.post("/add", (req, res, next) => {
  const { addrDetails } = req.body;
  Address.findOne({ user: addrDetails.user }).then((foundAddr) => {
    if (foundAddr) {
        foundAddr.address.push({
            contactNumber:addrDetails.address.contactNumber,
            houseNumber: addrDetails.address.houseNumber,
            street: addrDetails.address.street,
            city: addrDetails.address.city,
            postalCode: addrDetails.address.postalCode,
            country: addrDetails.address.country,
          });
    
    
          foundAddr.save().then((updatedAddr) => {
            res.json(updatedAddr);
          });
    } else {
      Address.create(addrDetails).then((response) => {
        res.json(response);
      });
    }
  });
});

module.exports = router;
