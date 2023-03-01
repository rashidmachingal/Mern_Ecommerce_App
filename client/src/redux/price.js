import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    itemsPrice : null,
    deliveryCharge : 100,
    dicount: 55,
    totalAmount: null
}

const priceSlice = createSlice({
    name: "price",
    initialState: INITIAL_STATE,
    reducers : {
        update_summary(state, action){
            state.itemsPrice = action.payload
            state.totalAmount = state.deliveryCharge + action.payload - state.dicount
        }
    }
})

export const { update_summary } = priceSlice.actions
export default priceSlice.reducer