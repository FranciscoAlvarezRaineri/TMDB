import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./reducers/list";
import userReducer from "./reducers/user";

export default configureStore({
  reducer: {
    user: userReducer,
    list: listReducer,
  },
});
