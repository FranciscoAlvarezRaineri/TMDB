const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");
const { generateToken } = require("../config/token");
const { validateUser } = require("../middleware/auth");

router.get("/movies/:searchMovie", (req, res) => {
  axios
    .get(
      `https://api.themoviedb.org/3/search/company?api_key=7f7b6b76f674af7ac35279fb451df8dc&query=${req.params.searchMovie}`
    )
    .then((response) => res.send(response.data));
});

// Crear un usuario nuevo
router.post("/user/new_user", (req, res) => {
  const { name, password } = req.body;
  User.create({ name, password })
    .then((r) => res.send(r))
    .catch((err) => console.log(err));
});

// Login un usuario dado un nombre y password
router.post("/user/login", (req, res) => {
  const { name, password } = req.body;
  User.findByName(name).then((user) => {
    if (!user) return res.send(401);
    user
      .validatePassword(password)
      .then((isValid) => {
        if (!isValid) return res.send(401);
        res.cookie("token", generateToken(user)).send(user);
      })
      .catch((err) => console.log(err));
  });
});

router.get("/user/secret", validateUser, (req, res) => {
  res.send(req.user);
});

router.post("/user/secret", (req, res) => {
  res.clearCookie("token").sendStatus(204);
});

// Buscar un usuario
router.get("/user/search/:userName", (req, res) => {
  User.findAll({ where: { name: req.params.userName } }).then((users) => {
    res.send(users);
  });
});

router.get("/favourites/:userId", (req, res) => {
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

// Agrega una película a la lista de favoritos del usuario logueado
router.put("/user/add_favourite", (req, res) => {
  const { userId, movieId } = req.body;
  User.findByPk(userId)
    .then((user) => user.addFavourite(movieId))
    .then((data) => {
      res.send(data.dataValues.favourites);
    })
    .catch((err) => console.log(err));
});

// Saca una película a la lista de favoritos del usuario logueado
router.put("/user/remove_favourite", (req, res) => {
  const { userId, movieId } = req.body;
  User.findByPk(userId)
    .then((user) => user.removeFavourite(movieId))
    .then((data) => {
      res.send(data.dataValues.favourites);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
