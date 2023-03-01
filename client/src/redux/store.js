import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cart'
import userReducer from './user'
import priceReducer from './price'

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        price: priceReducer
    }
})