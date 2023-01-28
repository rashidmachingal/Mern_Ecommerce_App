import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_cart } from "../redux/cart";
import axios from "./axios";

//add to cart
export const addToCart = async (cartItemDetails) => {
  return await axios.post(`/cart/add`, cartItemDetails);
};


// get user cart 
export const getUserCart = async (userId) => {
  return await axios.get(`/cart/get/${userId}`);
};

export const useFetchCartData = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user)
  useEffect(() => {
    getUserCart(userId).then((res) => {
      if (res.data != null) {
        dispatch(get_cart(res.data.cartItems));
      }
    });
  }, [dispatch, userId]);
};

// remove item from cart
export const removeItem = async (proId,userId) => {
  return await axios.put(`/cart/remove-item/${proId}/${userId}`);
};

// cart item count
export const cartItemCount = async (cartCountData) => {
  return await axios.post(`/cart/count`,cartCountData)
}