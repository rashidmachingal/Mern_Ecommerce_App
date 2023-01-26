const express = require("express");
const router = express.Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")

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
    // create token
    const { password, ...others } = registeredUser._doc;
    const token = jwt.sign({id: registeredUser._id,first_name: registeredUser.first_name},process.env.JWT_SEC);
    res.status(200).json({...others, token})
  } catch (error) {
    res.status(500).json(error)
  } 
});

// login user
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email:req.body.email})

        if(user === null) return res.status(401).json({auth:false});

        // decripting password
        const decryptedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const originalPassword = decryptedPassword.toString(CryptoJS.enc.Utf8)

        if(originalPassword !== req.body.password){
            return res.status(401).json({auth:false});
        }

        // create token
        const token = jwt.sign({id: user._id,first_name: user.first_name},process.env.JWT_SEC);
        const { password, ...others } = user._doc;
        res.status(200).json({...others, token})

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;
