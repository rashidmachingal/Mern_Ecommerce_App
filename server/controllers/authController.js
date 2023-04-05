const { generateOtp } = require("../utils/generateOtp");
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//register user
const registerUser = async (req, res) => {
    try {
      // Check if user already exists
      const isAlreadyUser = await User.findOne({ email: req.body.email });
      if (isAlreadyUser) return res.status(409).json({ message: 'User already exists' });
  
      // Encrypt user password
      const encryptedPassword = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();

      // generate otp send email to user
      const verificationCode  = await generateOtp(req.body.email)

      // Create new user
      const newUser = new User({
        first_name: req.body.first_name,
        second_name: req.body.second_name,
        email: req.body.email,
        password: encryptedPassword,
        otp: {code: verificationCode , expiry: new Date}
      });
  
      const registeredUser = await newUser.save();
  
      // Create token
      const token = jwt.sign(
        { id: registeredUser._id, first_name: registeredUser.first_name },
        process.env.PASS_SEC
      );
  
      // Remove password from user object
      const { password, otp , ...others } = registeredUser._doc;
  
      res.status(200).json({ ...others, token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


  //login user
  const loginUser = async (req, res)  => {
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

      // generate otp send email to user
      const verificationCode  = await generateOtp(req.body.email)

      // upate otp
      User.findOneAndUpdate(
        { email: req.body.email },
        { otp: { code: verificationCode, expiry: new Date() } },
        { new: true }
      )

      // create token
      const token = jwt.sign({id: user._id,first_name: user.first_name},process.env.PASS_SEC);
      const { password, otp , ...others } = user._doc;
      res.status(200).json({...others, token})

  } catch (error) {
      res.status(500).json(error)
  }
  }

  // otp verification
  const otpVerification = async (req, res) => {
    try {
      const userOtp = req.body.otp;
      const user = await User.findOne({ email: req.body.email });
      // otp expiry check
      const currentTime = new Date().getTime();
      const timestamp = new Date(user.otp.expiry).getTime()
      const diffMinutes = (currentTime - timestamp) / (1000 * 60);
      // verify otp
      if(user.otp.code === userOtp && diffMinutes < 10){
        res.status(200).json({message:"Otp Verification Success"})
      }else{
        res.status(401).json({message: "Invalid Otp"})
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }

  // send otp again
  const resendOtp = async (req, res) => {
    try {
      // verify user 
      const user = await User.findOne({ email: req.body.email });
      if(user === null) return

      // generate otp send email to user
      const verificationCode  = await generateOtp(req.body.email)
      // upate otp
      User.findOneAndUpdate(
          { email: req.body.email },
          { otp: { code: verificationCode, expiry: new Date() } },
          { new: true }
      ).then(() => {
          res.status(200).json({message: "Otp Sented Successfully"})
      }).catch((err) => {
          res.status(500).json(err)
      })

    } catch (error) {
      res.status(500).json(error)
    }
  }


  module.exports = { registerUser, loginUser, otpVerification, resendOtp };
