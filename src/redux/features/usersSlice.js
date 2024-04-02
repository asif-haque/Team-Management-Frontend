import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: { value: [], refetch: 0 },
  reducers: {
    setUsers: (state, action) => {
      state.value = action.payload;
    },
    refetchData: (state, action) => {
      state.refetch += 1;
    },
  },
});

export const { setUsers, refetchData } = usersSlice.actions;

export default usersSlice.reducer;
