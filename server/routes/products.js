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

// update product

router.put("/update/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error)
  }
})

// delete product
router.delete("/delete/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all product
router.get("/get-all", async (req, res) => {
    const pageIndex = req.query.page
    const limit = 15
    try {
        const allProducts = await Product.find().limit(limit).skip((pageIndex - 1) * limit)
        res.status(200).json(allProducts)
    } catch (error) {
        res.status(500).json(error);
    }
});

// get category products
router.get("/get-category-products/:category", async (req, res) => {
  const limit = 15
  const category = req.params.category
  try {
      const allProducts = await Product.find({"category":category}).limit(limit)
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

// search product
router.get("/search", async (req, res) => {
    const searchQuery = req.query.query
    const regex = new RegExp(searchQuery,'i');
    try {
        const singleProducts = await Product.find({title:regex})
        res.status(200).json(singleProducts)
    } catch (error) {
        res.status(500).json(error);
    }
});



module.exports = router;