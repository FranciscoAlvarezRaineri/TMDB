import axios from "axios";

const TMDB_API = "https://api.themoviedb.org/3/";
const TMDB_KEY = "api_key=7f7b6b76f674af7ac35279fb451df8dc";

const discoverMovie = `${TMDB_API}discover/movie?${TMDB_KEY}`;
const searchMovie = `${TMDB_API}search/movie?${TMDB_KEY}`;

const allMoviesByPopularity = (index) =>
  axios
    .get(
      `${discoverMovie}&sort_by=popularity.desc&include_adult=false&include_video=false&page=${index}`
    )
    .then((response) => response.data.results)
    .catch((err) => console.log(err));

const searchMovies = (search, index) =>
  axios
    .get(`${searchMovie}&query=${search}&page=${index}&include_adult=false`)
    .then((response) => response.data.results)
    .catch((err) => console.log(err));

const getMovieGenres = () =>
  axios
    .get(`${TMDB_API}genre/movie/list?${TMDB_KEY}&language=en-US`)
    .then((response) => response.data.results)
    .catch((err) => console.log(err));

export { allMoviesByPopularity, searchMovies, getMovieGenres };
