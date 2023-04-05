const { registerUser, loginUser, otpVerification, resendOtp } = require("../controllers/authController");
const express = require("express");
const router = express.Router();

// register user
router.post('/register', registerUser);

// login user
router.post("/login", loginUser)

// check verification code
router.post("/otp-verify", otpVerification)

// send otp again
router.post("/resend-otp", resendOtp)

module.exports = router;