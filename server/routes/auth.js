const { registerUser, loginUser, otpVerification } = require("../controllers/authController");
const express = require("express");
const router = express.Router();

// register user
router.post('/register', registerUser);

// login user
router.post("/login", loginUser)

// check verification code
router.post("/otp-verify", otpVerification)

module.exports = router;