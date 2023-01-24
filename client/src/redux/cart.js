import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    cartItems: []
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
        get_cart: (state, action) => {
            state.cartItems.push(...action.payload)
        },
    }
})

export const {add_to_cart, remove_item, get_cart} = cartSlice.actions;
export default cartSlice.reducer