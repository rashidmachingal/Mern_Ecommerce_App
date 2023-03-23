import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart } from "../api/cart-api";
import { get_cart } from "../redux/cart";
import { update_summary } from "../redux/price";

// fetch user cart data and update store cart data if user logged in
export const FetchUserCartDataAndUpdate = () => {
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

// create order price details
export const CreatePriceDetails = () => {
    const dispatch = useDispatch()
    const { cartItems } = useSelector((state) => state.cart)

    useEffect(() => {
        let updatedItemsPrice = 0;
        cartItems?.map((i) => {
          return updatedItemsPrice += i?.offer_price * i?.quantity;
        });
        
        dispatch(update_summary(updatedItemsPrice))
      }, [cartItems,dispatch]);
}