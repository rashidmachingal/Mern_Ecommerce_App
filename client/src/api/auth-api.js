import axios from "./axios";

//register user
export const RegisterUser = async (userData) => {
    return await axios.post(`/auth/register`, userData)
};

//login user
export const AuthUser = async (loginData) => {
    return await axios.post(`/auth/auth`, loginData)
};

// otp verification 
export const VerifyOtp = async (verificationData) => {
    return await axios.post(`/auth/otp-verify`, verificationData)
} 