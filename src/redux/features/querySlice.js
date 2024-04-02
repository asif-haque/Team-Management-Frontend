import { createSlice } from "@reduxjs/toolkit";

export const querySlice = createSlice({
  name: "query",
  initialState: {
    value: {
      page: 1,
      perPage: 20,
      search: "",
      domain: "",
      gender: "",
    },
  },
  reducers: {
    updateQuery: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    deleteQuery: (state, action) => {
      const del = action.payload;
      delete state.value[del];
    },
  },
});

export const { updateQuery, deleteQuery } = querySlice.actions;

export default querySlice.reducer;
