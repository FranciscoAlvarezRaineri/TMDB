import axios from "axios";

const TMDB_KEY = `api_key=7f7b6b76f674af7ac35279fb451df8dc`;
const route = `https://api.themoviedb.org/3/discover`;

/*const media = "/movie";
const lang = "en-US";
const sort = "popularity.desc";
const adult = "false";
const video = "false";
const page = 1;
const yeargte = "1984";
const yearlte = "2023";*/

const discover = (url) => {
  console.log(url);
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

export default discover;
