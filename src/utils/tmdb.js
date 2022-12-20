import axios from "axios";

const allByPopularity = (index = 1) =>
  axios
    .get(
      `https://api.themoviedb.org/3/discover/movie?api_key=7f7b6b76f674af7ac35279fb451df8dc&sort_by=popularity.desc&include_adult=false&include_video=false&page=${index}`
    )
    .then((response) => response.data.results)
    .catch((err) => console.log(err));

export { allByPopularity };
