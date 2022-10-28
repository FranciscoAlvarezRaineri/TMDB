const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:userId", (req, res) => {
  User.findByPk(req.params.userId).then((user) => {
    Promise.all(
      user.dataValues.favourites.map((id) =>
        axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=7f7b6b76f674af7ac35279fb451df8dc`
        )
      )
    ).then((response) => res.send(response.map((item) => item.data)));
  });
});

module.exports = router;
