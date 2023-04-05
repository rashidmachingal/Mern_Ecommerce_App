const { sendEmail } = require("./sendEmail");

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

module.exports = { generateOtp }