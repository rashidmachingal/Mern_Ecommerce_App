import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    cartItems : [],
    cartCount : 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState: INITIAL_STATE,
    reducers: {
        addToCart: (state) => {
            state.cartCount += 1
            console.log(state)
        },
        increment: () => {},
        decrement: () => {},
    }
})

export const {addToCart, increment, decrement} = cartSlice.actions;

export default cartSlice.reducer