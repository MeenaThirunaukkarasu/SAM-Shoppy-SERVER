const express = require("express");
const router = express.Router();
const Address =require('../models/Address.model')
router.get("/", (req, res, next) => {
Address.find()
.then(response=>{
    res.json(response);
})
});

router.post("/add", (req, res, next) => {
    const {addrDetails}=req.body
Address.create(addrDetails)
.then(response=>{
    res.json(response);
})
});

module.exports = router;
