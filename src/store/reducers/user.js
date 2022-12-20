import { createAction, createReducer } from "@reduxjs/toolkit";

const logIn = createAction("logIn");
const logOut = createAction("logOut");
const initialState = {};

const userReducer = createReducer(initialState, {
  logIn: (state, action) => action.payload,
  logOut: (state, action) => initialState,
});

export default userReducer;

export { logIn, logOut };
