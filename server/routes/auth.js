const { otpVerification, authUser } = require("../controllers/authController");
const express = require("express");
const router = express.Router();

// auth user 
router.post("/auth", authUser)

// check verification code
router.post("/otp-verify", otpVerification)

module.exports = router;