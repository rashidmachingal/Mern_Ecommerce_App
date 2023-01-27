import axios from "./axios";

//register user
export const RegisterUser = async (userData) => {
    return await axios.post(`/user/register`, userData)
};

//login user
export const LoginUser = async (loginData) => {
    return await axios.post(`/user/login`, loginData)
};
