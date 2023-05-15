const { generateOtp, createAndSendOtp } = require("../utils/user/generateOtp");
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// user login or signup
const authUser = async (req, res) => {
  try {
    if(req.body.email){
      loginOrSignUpWithEmail(req, res)
    }

    if(req.body.mobile){
      console.log("mobile")
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
}

// register or login with email
const loginOrSignUpWithEmail = async (req, res) => {
    try {
      // Check if user already exists
      const isAlreadyUser = await User.findOne({ email: req.body.email });

      // sent otp if user already registered with email
      if (isAlreadyUser) {
        // create otp and update on db and sent to already registered email
        createAndSendOtp(req.body.email)
        res.status(200).json({ needOTPVerification: true });
      }

      // create new user if user not registered with email already
      if(!isAlreadyUser){
        const newUser = new User({email: req.body.email});
        await newUser.save().then((savedUser) => {
          res.status(200).json({needOTPVerification:true})
        }).catch((error) => {
          res.status(500).json({ message: 'Error saving user', error });
        })
        // create otp and update on db and sent to registered email
        createAndSendOtp(req.body.email)
      }

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


// create jwt token sent to user
  const createJwtToken = async (req, res)  => {
    try {
        const token = jwt.sign({id: req.body},process.env.PASS_SEC);
        if(req.body.loginMethodData.email){
          console.log(req.body.loginMethodData.email)
          res.status(200).json({verified:true,token,authData:req.body.loginMethodData.email})
        }else{
          res.status(200).json({verified:true,token,authData:req.body.loginMethodData.mobile})
        }

  } catch (error) {
      res.status(500).json(error)
  }
  }

  // otp verification
  const otpVerification = async (req, res) => {
    try {
      // user submited otp
      const userOtp = req.body.completeOtp;

      if(req.body.loginMethodData.email){
        const user = await User.findOne({ email: req.body.loginMethodData.email });
        console.log("email")
        verifyOtp(user)
      }else{
        const user = await User.findOne({ mobile: req.body.loginMethodData.mobile});
        console.log("mobile")
        verifyOtp(user)
      }
      
      function verifyOtp (user) {
      // otp expiry check
      const currentTime = new Date().getTime();
      const timestamp = new Date(user.otp.expiry).getTime()
      const diffMinutes = (currentTime - timestamp) / (1000 * 60);
      // verify otp
      if(user.otp.code === userOtp && diffMinutes < 10){
        User.findOneAndUpdate(
          { email: req.body.email },
          { verified: true },
          { new: true }
      ).then(() => {
        createJwtToken(req, res)
      })
      }else{
        res.status(401).json({otpVerification:false})
      }
      }
    } catch (error) {
      res.status(500).json(error)
      console.log(error)
    }
  }

  module.exports = { otpVerification, authUser };

