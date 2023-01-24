const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

// add to cart
router.post("/add", async (req, res) => {
  try {
    const isAlreadyCart = await Cart.findOne({userId:req.body.userId})
    if(isAlreadyCart != null){
      const updatedCart = await Cart.findOneAndUpdate(
        {userId : req.body.userId},
        {$push: {cartItems : req.body.updatedItem}}
      )
      res.status(200).json(updatedCart);
    }else{
      const newCart = new Cart(req.body);
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    }

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

// get user cart
router.get("/get/:userId", async (req, res) => {
  try {
    const userCart = await Cart.findOne({userId:req.params.userId})
    res.status(200).json(userCart)
  } catch (error) {
    res.status(500).json(error)
  }
})
  


module.exports = router;