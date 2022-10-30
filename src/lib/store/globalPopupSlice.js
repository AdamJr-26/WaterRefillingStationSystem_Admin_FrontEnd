import { createSlice } from "@reduxjs/toolkit";

export const globalPopupSlice = createSlice({
    name: "globalpopup",
    initialState: {
        addGallonValue: false,
        addVehicleValue: false,
        updateGallonValue: false,
        newTransactionValue: false,
    },
    reducers: {
        addGallonState:(state)=>{
            state.addGallonValue = !state.addGallonValue;
        },
        addVehicleState:(state)=>{
            state.addVehicleValue = !state.addVehicleValue;
        },
        updateGallonState: (state)=>{
            state.updateGallonValue = !state.updateGallonValue;
        },
        newTransactionState:(state)=>{
            state.newTransactionValue = !state.newTransactionValue;
        },

    }
})
export const  {addGallonState, addVehicleState, updateGallonState, newTransactionState} = globalPopupSlice.actions;
export default globalPopupSlice.reducer;