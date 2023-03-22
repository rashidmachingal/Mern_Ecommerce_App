import axios from "./axios";

//add to cart
export const addToCart = async (cartItemDetails) => {
  return await axios.post(`/cart/add`, cartItemDetails);
};


// get user cart 
export const getUserCart = async (userId) => {
  return await axios.get(`/cart/get/${userId}`);
};

// remove item from cart
export const removeItem = async (proId,userId) => {
  return await axios.put(`/cart/remove-item/${proId}/${userId}`);
};

// cart item count
export const cartItemCount = async (cartCountData) => {
  return await axios.post(`/cart/count`,cartCountData)
}