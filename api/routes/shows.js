const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/search/:showName", (req, res) => {
  axios
    .get(
      `https://api.themoviedb.org/3/search/tv?api_key=7f7b6b76f674af7ac35279fb451df8dc&query=${req.params.showName}&include_adult=false`
    )
    .then((response) => {
      res.send(response);
    });
});

module.exports = router;
