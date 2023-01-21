const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// create product
router.post("/create", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all product
router.get("/get-all", async (req, res) => {
    const pageIndex = req.query.page
    const limit = 5
    try {
        const allProducts = await Product.find().limit(limit).skip((pageIndex - 1) * limit)
        res.status(200).json(allProducts)
    } catch (error) {
        res.status(500).json(error);
    }
});

// get single product
router.get("/get/:id", async (req, res) => {
    try {
        const singleProducts = await Product.findById(req.params.id)
        res.status(200).json(singleProducts)
    } catch (error) {
        res.status(500).json(error);
    }
});





module.exports = router;