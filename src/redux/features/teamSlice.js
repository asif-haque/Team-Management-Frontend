import { createSlice } from "@reduxjs/toolkit";

export const teamSlice = createSlice({
  name: "team",
  initialState: { value: [] },
  reducers: {
    addToTeam: (state, action) => {
      state.value.push(action.payload);
    },
    removeFromTeam: (state, action) => {
      state.value = state.value.filter((el) => el !== action.payload);
    },
  },
});

export const { addToTeam } = teamSlice.actions;

export default teamSlice.reducer;
