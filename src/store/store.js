import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./reducers/list";
import userReducer from "./reducers/user";
import discoverUrlReducer from "./reducers/discoverUrl";

export default configureStore({
  reducer: {
    user: userReducer,
    list: listReducer,
    discoverUrl: discoverUrlReducer,
  },
});
