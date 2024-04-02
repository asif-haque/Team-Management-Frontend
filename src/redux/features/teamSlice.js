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
    clearTeam: (state) => {
      state.value = [];
    },
  },
});

export const { addToTeam, removeFromTeam, clearTeam } = teamSlice.actions;

export default teamSlice.reducer;
