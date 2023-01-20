const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// create product
router.post("/create-product", async (req, res) => {
    const newProduct = new Product(req.body)
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
});





module.exports = router;