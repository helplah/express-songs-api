const express = require("express");
const app = express();

const songRouter = require("./routes/songs");
const movieRouter = require("./routes/movies");

app.use(express.json());

app.use("/songs", songRouter);
app.use("/movies", movieRouter);

app.use((err, req, res, next) => {
  res.status(404);
  res.send({ message: err.message });
});

app.use((err, req, res, next) => {
  res.status(500);
  res.send({ error: "unknown error" });
});

module.exports = app;
