import axios from "axios";

const discover = (url) => {
  console.log(url);
  return axios
    .get(url)
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

export default discover;
