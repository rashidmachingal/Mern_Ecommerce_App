import axios from "./axios";

//register user
export const RegisterUser = async (userData) => {
    return await axios.post(`/auth/register`, userData)
};

//login user
export const LoginUser = async (loginData) => {
    return await axios.post(`/auth/login`, loginData)
};

// otp verification 
export const VerifyOtp = async (verificationData) => {
    return await axios.post(`/auth/otp-verify`, verificationData)
} 