const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/search/:movieTitle", (req, res) => {
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=7f7b6b76f674af7ac35279fb451df8dc&query=${req.params.movieTitle}&include_adult=false`
    )
    .then((response) => {
      res.send(response.data.results);
    });
});

module.exports = router;
