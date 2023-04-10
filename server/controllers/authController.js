const { generateOtp, createAndSendOtp } = require("../utils/user/generateOtp");
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

      // Create new user
      const newUser = new User({
        user_name: req.body.user_name,
        email: req.body.email,
        password: encryptedPassword,
      });
       await newUser.save();

      // create otp and update on db and sent email
      createAndSendOtp(req.body.email)
      res.status(200).json({verified:false})
      
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

      // authentication failed sent to client
      if(originalPassword !== req.body.password){
          return res.status(401).json({auth:false});
      }

      // check user verified or not if not sent otp and upadate on db and sent not verified to client
      if(user.verified === false) {
        createAndSendOtp(req.body.email)
        res.status(200).json({verified:false})
      }else{
        // login success - create jwt token and sent to client
        const token = jwt.sign({id: user._id,first_name: user.first_name},process.env.PASS_SEC);
        const { password, otp , ...others } = user._doc;
        res.status(200).json({...others, token})
      }

  } catch (error) {
      res.status(500).json(error)
  }
  }

  // otp verification
  const otpVerification = async (req, res) => {
    try {
      const userOtp = req.body.completeOtp;
      const user = await User.findOne({ email: req.body.email });
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
        loginUser(req, res)
      })
      }else{
        res.status(401).json({otpVerification:false})
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }

  module.exports = { registerUser, loginUser, otpVerification };

