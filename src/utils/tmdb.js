import axios from "axios";
require("dotenv").config();

const TMDB_API = "https://api.themoviedb.org/3";
const TMDB_KEY = `api_key=7f7b6b76f674af7ac35279fb451df8dc`;

const discover = (discoverUrl) => {
  const {
    media,
    lang,
    sort,
    adult,
    video,
    page,
    yeargte,
    yearlte,
    genres,
    voteCount,
  } = discoverUrl;

  const url = `${TMDB_API}/discover${media}?${TMDB_KEY}&language=${lang}&sort_by=${sort}&include_adult=${adult}&include_video=${video}&page=${page}${
    yeargte ? `&release_date.gte=${yeargte}&air_date.gte=${yeargte}` : ""
  }${yearlte ? `&release_date.lte=${yearlte}&air_date.lte=${yearlte}` : ""}${
    genres.length ? `&with_genres=${genres.join("%2C")}` : ""
  }&vote_count.gte=${voteCount}`;

  console.log(url);
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

const searchMovies = (search, page) =>
  axios
    .get(
      `${TMDB_API}search/movie?${TMDB_KEY}&query=${search}&page=${page}&include_adult=false`
    )
    .then((response) => response.data.results)
    .catch((err) => console.log(err));

const getGenres = (media) =>
  axios
    .get(`${TMDB_API}/genre${media}/list?${TMDB_KEY}&language=en-US`)
    .then((response) => response.data.genres)
    .catch((err) => console.log(err));

export { discover, searchMovies, getGenres };
