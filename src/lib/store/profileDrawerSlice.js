import { createSlice } from "@reduxjs/toolkit";

export const profileDrawerSlice = createSlice({
  name: "profile",
  initialState: {
    value: true,
  },
  reducers: {
    openProfile: (state) => {
      state.value = !state.value;
    },
  },
});

export const { openProfile } = profileDrawerSlice.actions;
export default profileDrawerSlice.reducer;
