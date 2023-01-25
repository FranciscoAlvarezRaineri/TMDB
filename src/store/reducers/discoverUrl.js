import { createAction, createReducer } from "@reduxjs/toolkit";

const modifyUrl = createAction("modifyUrl");
const initialState = {
  route: "https://api.themoviedb.org/3/discover",
  media: "/movie",
  TMDB_KEY: "api_key=7f7b6b76f674af7ac35279fb451df8dc",
  lang: "en-US",
  sort: "popularity.desc",
  adult: "false",
  video: "false",
  page: 1,
  yeargte: "1800",
  yearlte: "2024",
  genres: [],
};

const discoverUrlReducer = createReducer(initialState, {
  modifyUrl: (state, action) => {
    return { ...state, ...action.payload };
  },
});

export default discoverUrlReducer;

export { modifyUrl };
