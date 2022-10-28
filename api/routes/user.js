const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { generateToken } = require("../config/token");
const { validateUser } = require("../middleware/auth");

// Crear un usuario nuevo
router.post("/new_user", (req, res) => {
  const { name, password } = req.body;
  User.create({ name, password })
    .then((r) => res.send(r))
    .catch((err) => console.log(err));
});

// Login un usuario dado un nombre y password
router.post("/login", (req, res) => {
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

router.get("/secret", validateUser, (req, res) => {
  res.send(req.user);
});

router.post("/secret", (req, res) => {
  res.clearCookie("token").sendStatus(204);
});

// Buscar un usuario
router.get("/search/:userName", (req, res) => {
  User.findAll({ where: { name: req.params.userName } }).then((users) => {
    console.log(users);
    res.send(users);
  });
});

// Agrega una película a la lista de favoritos del usuario logueado
router.put("/add_favourite", (req, res) => {
  const { userId, movieId } = req.body;
  User.findByPk(userId)
    .then((user) => user.addFavourite(movieId))
    .then((data) => {
      res.send(data.dataValues.favourites);
    })
    .catch((err) => console.log(err));
});

// Saca una película a la lista de favoritos del usuario logueado
router.put("/remove_favourite", (req, res) => {
  const { userId, movieId } = req.body;
  User.findByPk(userId)
    .then((user) => user.removeFavourite(movieId))
    .then((data) => {
      res.send(data.dataValues.favourites);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
