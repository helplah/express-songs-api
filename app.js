const express = require("express");
const app = express();

app.use(express.json());

let songs = [];

app.param("id", (req, res, next, id) => {
  req.song = songs.find(song => {
    return song.id == id;
  });

  next();
});

//return list of all songs
app.get("/songs", (req, res) => {
  res.status(200).json(songs);
});

//create a new song, and return new song
app.post("/songs", (req, res) => {
  let newSong = {
    id: songs.length + 1,
    name: req.body.name,
    artist: req.body.artist
  };
  songs.push(newSong);
  res.status(201).json(newSong);
});

//return a song with id
app.get("/songs/:id", (req, res) => {
  const song = req.song;
  res.status(200).json(song);
});

//edit a song with id, and return edited song
app.put("/songs/:id", (req, res) => {
  const song = req.song;
  song.name = req.body.name;
  song.artist = req.body.artist;
  res.status(200).json(song);
});

//delete a song with id, and return deleted song
app.delete("/songs/:id", (req, res) => {
  const songToDelete = req.song;
  let index = songs.indexOf(songToDelete);
  songs.splice(index, 1);
  res.status(200).json(songToDelete);
});

module.exports = app;
