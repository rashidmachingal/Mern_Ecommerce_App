const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

// add to cart
router.post("/add", async (req, res) => {
  try {
    const isAlreadyCart = await Cart.findOne({userId:req.body.userId})
    if(isAlreadyCart != null){

      // move guest cart to user cart
      const isGuestMove = req.body.type
      if(isGuestMove){
        const updatedCart = await Cart.findOneAndUpdate(
          {userId : req.body.userId},
          {$push: {cartItems : { $each: req.body.cartItems }}}
        )
        res.status(200).json(updatedCart);
        return
      }

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

// cart item count change
router.post("/count" , async (req, res) => {
  const userId = req.body.userId
  const countType = req.body.countType
  const productId = req.body.productId
  const currentCount = req.body.currentCount
  try {
    if(countType === "increment"){
      Cart.updateOne(
        { "userId" : userId, "cartItems.productId": productId }, 
        { $inc: { "cartItems.$.quantity": 1 } }
      ).then(() => {
        res.json({message:"Quantity Icremented Succesfully"})
      })
    }

    if(countType === "decrement") {

      // remove item if count 1
      if(currentCount === 1){
        Cart.findOneAndUpdate(
          {userId : userId},
          {$pull: {cartItems : {productId}}}
        ).then(()=>{
          res.json({message:"Product Removed Succesfully"})
        })
      }else{
        Cart.updateOne(

          { "userId" : userId, "cartItems.productId": productId }, 
          { $inc: { "cartItems.$.quantity": -1 } }
        ).then(() => {
          res.json({message:"Quantity Decremented Succesfully"})
        })
      }

      
    }

  } catch (error) {
    res.status(200).json(error)
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