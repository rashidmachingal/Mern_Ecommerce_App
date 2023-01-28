import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user")) || ""
const INITIAL_STATE = {
    user_name : user.user_name || null,
    userId : user.userId || null,
    token : user.token || null
}

const userSlice = createSlice({
    name: "user",
    initialState: INITIAL_STATE,
    reducers: {
        user_auth : (state, action) => {
            state.user_name = action.payload.user_name
            state.userId = action.payload.userId
            state.token = action.payload.token

            localStorage.setItem("user", JSON.stringify({
                user_name: state.user_name,
                userId: state.userId,
                token: state.token
            }));
        },
        logout : (state) => {
            state.user_name = null
            state.userId = null
            state.token = null
        }
    }
})

export const { user_auth, logout } = userSlice.actions;
export default userSlice.reducer