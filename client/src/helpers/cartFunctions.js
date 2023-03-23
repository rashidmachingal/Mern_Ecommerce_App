import { useSelector } from "react-redux"
import { addToCart } from "../api/cart-api"

// move guest user cart to server on user logged in or signup from local storage
export const MoveGuestCartToServer = (userId) => {
    const { cartItems } = useSelector((state) => state.cart)
    const cartItemDetails = {userId, cartItems, type: true}
    const isCart = localStorage.getItem("cartItems")
    if(isCart){
        addToCart(cartItemDetails).then(() => {
          localStorage.removeItem("cartItems")
        })
      }
}