import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./features/usersSlice";
import teamSlice from "./features/teamSlice";
import querySlice from "./features/querySlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    team: teamSlice,
    query: querySlice,
  },
});

export default store;
