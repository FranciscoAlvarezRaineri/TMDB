import { createAction, createReducer } from "@reduxjs/toolkit";

const modifyUrl = createAction("modifyUrl");
const initialState = {
  media: "/movie",
  lang: "en-US",
  sort: "popularity.desc",
  adult: "false",
  video: "false",
  page: 1,
  yeargte: "1800",
  yearlte: "2024",
  genres: [],
  voteCount: 0,
};

const discoverUrlReducer = createReducer(initialState, {
  modifyUrl: (state, action) => {
    return { ...state, ...action.payload };
  },
});

export default discoverUrlReducer;

export { modifyUrl };
