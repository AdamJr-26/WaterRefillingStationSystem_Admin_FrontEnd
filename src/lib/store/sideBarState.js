import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        value: true,
    },
    reducers: {
        updateSidebarStatus: (state)=>{
            state.value = !state.value
        }
    }
})

export const {updateSidebarStatus} = sidebarSlice.actions
export default sidebarSlice.reducer