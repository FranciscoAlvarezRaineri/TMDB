import { createAction, createReducer } from "@reduxjs/toolkit";

const newList = createAction("newList");
const addToList = createAction("addFavourite");
const removeFromList = createAction("removeFavourite");
const clearList = createAction("cleanList");
const initialState = [];

const listReducer = createReducer(initialState, {
  newList: (state, action) => action.payload,
  addToList: (state, action) => [...state, action.payload],
  removeFromList: (state, action) => state.filter((e) => e !== action.payload),
  clearList: (state, action) => initialState,
});

export default listReducer;

export { newList, addToList, removeFromList, clearList };
