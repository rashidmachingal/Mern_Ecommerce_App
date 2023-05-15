import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user")) || ""
const INITIAL_STATE = {
    token : user.token || null,
    authData : user.authData || null
}

const userSlice = createSlice({
    name: "user",
    initialState: INITIAL_STATE,
    reducers: {
        user_auth : (state, action) => {
            state.token = action.payload.token
            state.authData = action.payload.authData
            localStorage.setItem("user", JSON.stringify({
                token: state.token,
                authData: state.authData
            }));
        },
        logout : (state) => {
            state.token = null
        }
    }
})

export const { user_auth, logout } = userSlice.actions;
export default userSlice.reducer