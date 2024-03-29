import { createSlice } from "@reduxjs/toolkit";

const guestCart = JSON.parse(localStorage.getItem('cartItems')) || []

export const INITIAL_STATE = {
    cartItems: guestCart
}

const cartSlice = createSlice({
    name: "cart",
    initialState: INITIAL_STATE,
    reducers: {
        add_to_cart: (state, action) => {
            state.cartItems.push(action.payload)
        },
        remove_item: (state, action) => {
            state.cartItems.splice(action.payload, 1);
        },
        cart_item_count : (state, action) => {
            if(action.payload.countType === "increment"){
                const count = state.cartItems[action.payload.productIndex].quantity 
                state.cartItems[action.payload.productIndex].quantity = count + 1
            }

            if(action.payload.countType === "decrement"){
                if(action.payload.currentCount === 1){
                  state.cartItems.splice(action.payload.productIndex, 1);
                  return
                }
                const count = state.cartItems[action.payload.productIndex].quantity
                state.cartItems[action.payload.productIndex].quantity = count - 1
            }
        },
        get_cart: (state, action) => {
            state.cartItems.push(...action.payload)
        },
        clear_cart: (state, action) => {
            state.cartItems.length = 0
        }
    }
})

export const {add_to_cart, remove_item, cart_item_count, get_cart, clear_cart} = cartSlice.actions;
export default cartSlice.reducer