const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

// add to cart
router.post("/add", async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update cart
router.put("/update/:userId", async (req, res) => {
  const userId = req.params.userId
  const newData = req.body
    try {
      const updatedCart = await Cart.findOneAndUpdate(
        {userId : userId},
        {$push: {cartItems : newData}}
      )
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// remove cart item
router.put("/remove-item/:proId/:userId", async (req, res) => {
  try {
    const afterRemovedCart = await Cart.findOneAndUpdate(
      {userId : req.params.userId},
      {$pull: {cartItems : {productId: req.params.proId}}}
    )
    res.status(200).json(afterRemovedCart)
  } catch (error) {
    res.status(500).json(error)
  }
})
  


module.exports = router;