const express = require("express");
const movies = require("./routes/movies");
const songs = require("./routes/songs");
const app = express();

app.use(express.json());
app.use("/movies", movies);
app.use("/songs", songs);

module.exports = app;
