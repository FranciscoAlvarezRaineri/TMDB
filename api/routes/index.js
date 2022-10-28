const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");
const { generateToken } = require("../config/token");
const { validateUser } = require("../middleware/auth");
const user = require("./user");
const movies = require("./movies");
const shows = require("./shows");
const favourites = require("./favourites");

router.use("/user", user);
router.use("/movies", movies);
router.use("/shows", shows);
router.use("/favourites", favourites);

module.exports = router;
