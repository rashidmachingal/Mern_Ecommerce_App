const { sendEmail } = require("../sendEmail");
const User = require("../../models/User");

const generateOtp = async (email) => {
    const chars = "0123456789";
    const len = 6;
    let otp = "";
    for (let i = 0; i < len; i++) {
        otp += chars[Math.floor(Math.random() * chars.length)];
    }

    const emailMessage = `Your verification code is : ${otp}, OTP will be expiry after 10 minutes`
    const subject = 'Verification Code for RashCart'
    sendEmail(email, subject, emailMessage)
    
    return otp 
}

//check user verified or not if not sent otp and upadate on db
const createAndSendOtp = async (email) => {
    // generate otp send email to user
    const verificationCode  = await generateOtp(email)
    // upate otp
    const expiry = new Date(); // current date and time
    const updatedOtp = await User.findOneAndUpdate(
      { email: email },
      { otp: { code: verificationCode, expiry: expiry } },
      { new: true }
    )
  }

module.exports = { generateOtp , createAndSendOtp }