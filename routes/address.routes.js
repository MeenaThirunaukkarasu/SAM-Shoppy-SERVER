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

router.delete("/:userId/:addressId", (req, res, next) => {
  const userId = req.params.userId;
  console.log('userId',userId)
  const addressId = req.params.addressId;
  console.log('addressId',addressId)

  // Find the user by userId
  Address.findOne({ user: userId })
    .then((address) => {
      if (!address) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Find the index of the address with the given addressId
      const addressIndex = address.address.findIndex((addr) => addr._id.toString() === addressId);

      if (addressIndex === -1) {
        return res.status(404).json({ error: 'Address not found' });
      }

      // Remove the address from the array
      address.address.splice(addressIndex, 1);

      // Save the updated address
      return address.save();
    })
    .then((updatedAddress) => {
      res.json(updatedAddress);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

module.exports = router;
