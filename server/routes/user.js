const express = require("express");
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

// register user
router.post("/register", async (req, res) => {
  
  const newUser = await User({
    first_name: req.body.first_name,
    second_name: req.body.second_name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const registeredUser = await newUser.save();
    res.status(200).json(registeredUser);
  } catch (error) {
    res.status(500).json(error)
  } 
});

module.exports = router;
