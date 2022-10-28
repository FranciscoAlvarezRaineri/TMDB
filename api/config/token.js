const jwt = require("jsonwebtoken");
const SECRET = "thisisnoplacetokeepasecret";

const generateToken = function (payload) {
  return jwt.sign({ payload }, SECRET);
};

const validateToken = function (token) {
  return jwt.verify(token, SECRET);
};

module.exports = { generateToken, validateToken };
