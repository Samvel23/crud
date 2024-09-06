import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./components/UserList/userlist.slice";

export const store = configureStore({
  reducer: userReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware();
  },
});
