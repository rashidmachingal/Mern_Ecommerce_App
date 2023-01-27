import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    user_name : null,
    userId : null,
    token : null
}

const userSlice = createSlice({
    name: "user",
    initialState: INITIAL_STATE,
    reducers: {
        user_auth : (state, action) => {
            state.user_name = action.payload.user_name
            state.userId = action.payload.userId
            state.token = action.payload.token
        }
    }
})

export const { user_auth } = userSlice.actions;
export default userSlice.reducer