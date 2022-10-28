// Configuración del server

// Router los pedidos del front a la API de TMDB

const express = require("express");
const db = require("./db");
const routes = require("./routes/index");
const cookieParser = require("cookie-parser");

const app = express();
const key = "7f7b6b76f674af7ac35279fb451df8dc";

app.use(express.json());
app.use(cookieParser());

//test
app.get("/", (req, res) => {
  res.send("hola");
});

app.use("/api", routes);

db.sync({ force: false }).then(() => {
  app.listen(3001, () => console.log(`Listening on 3001`));
});
