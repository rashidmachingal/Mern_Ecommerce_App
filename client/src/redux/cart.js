import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    cartItems: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState: INITIAL_STATE,
    reducers: {
        add_to_cart: (state, action) => {
            state.cartItems.push(...action.payload)
        },
        get_cart: (state, action) => {
            state.cartItems.push(...action.payload)
        },
    }
})

export const {add_to_cart, get_cart} = cartSlice.actions;
export default cartSlice.reducer