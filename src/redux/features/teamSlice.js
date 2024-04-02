import { createSlice } from "@reduxjs/toolkit";

export const teamSlice = createSlice({
  name: "team",
  initialState: { value: [], refetch: 0 },
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
    refetchTeamData: (state, action) => {
      state.refetch += 1;
    },
  },
});

export const { addToTeam, removeFromTeam, clearTeam, refetchTeamData } =
  teamSlice.actions;

export default teamSlice.reducer;
