import axios from "axios";
require("dotenv").config();

const TMDB_API = "https://api.themoviedb.org/3/";
const TMDB_KEY = `api_key=7f7b6b76f674af7ac35279fb451df8dc`;

const discoverMovie = `${TMDB_API}discover/movie?${TMDB_KEY}`;
const searchMovie = `${TMDB_API}search/movie?${TMDB_KEY}`;

const allMoviesByPopularity = (page) =>
  axios
    .get(
      `${discoverMovie}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
    )
    .then((response) => response.data.results)
    .catch((err) => console.log(err));

const allMoviesByGenre = (page, genreId) =>
  axios
    .get(
      `${discoverMovie}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreId}`
    )
    .then((response) => response.data.results)
    .catch((err) => console.log(err));

const allMoviesByYear = (page, years) =>
  axios
    .get(
      `${discoverMovie}&language=en-US&sort_by=popularity.asc&include_adult=false&include_video=false&page=${page}&release_date.gte=${years[0]}&release_date.lte=${years[1]}`
    )
    .then((response) => response.data.results)
    .catch((err) => console.log(err));

const searchMovies = (search, page) =>
  axios
    .get(`${searchMovie}&query=${search}&page=${page}&include_adult=false`)
    .then((response) => response.data.results)
    .catch((err) => console.log(err));

const getMovieGenres = () =>
  axios
    .get(`${TMDB_API}genre/movie/list?${TMDB_KEY}&language=en-US`)
    .then((response) => response.data.genres)
    .catch((err) => console.log(err));

export {
  allMoviesByPopularity,
  allMoviesByGenre,
  allMoviesByYear,
  searchMovies,
  getMovieGenres,
};
