import { createSlice } from "@reduxjs/toolkit";

export const userAuthorizationSlice = createSlice({
    name: "globalpopup",
    initialState: {
        user: null,

    },
    reducers: {
        getUser:(state)=>{
            state.user = !state.user;
        },
    }
})
export const  {getUser} = userAuthorizationSlice.actions;
export default userAuthorizationSlice.reducer;
