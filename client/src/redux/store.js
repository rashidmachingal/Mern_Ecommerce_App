import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cart'
import userReducer from './user'

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer
    }
})