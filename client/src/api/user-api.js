import axios from "./axios";

//register user
export const RegisterUser = async (userData) => {
    return await axios.post(`/user/register`, userData)
};
