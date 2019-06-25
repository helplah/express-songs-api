const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let songs = [
  { id: 1, name: "In The End", artist: "LinkinPark" },
  { id: 2, name: "Numb", artist: "LinkinPark" }
];

//return list of all songs
app.get("/", (req, res) => {
  // can do both .send and .json
  res.status(200).send(songs);
});

//create a new song, and return new song
app.post("/", (req, res) => {
  // console.log(req.body);
  // try {
  //   req.body.array.forEach(element => {});
  // } catch (err) {}
  songs.push(req.body);
  res.status(201).send(req.body);
});

//return a song with id
app.get("/songs/:id", (req, res) => {
  const id = Number(req.params.id);
  const song = songs.find(song => {
    // assuming there are no duplicate ids
    return song.id === id;
  });

  res.status(200).send(song);
});

//edit a song with id, and return edited song
app.put("/songs/:id", (req, res) => {
  const id = Number(req.params.id);
  const song = songs.find(song => {
    // assuming there are no duplicate ids
    return song.id === id;
  });

  song.name = req.body.name;
  song.artist = req.body.artist;

  res.status(200).send(song);
});

//delete a song with id, and return deleted song
app.delete("/songs/:id", (req, res) => {
  const id = Number(req.params.id);

  let song = [];
  for (let x = 0; x < songs.length; x++) {
    if (songs[x].id === id) {
      song = songs[x];
      songs.splice(x, 1);
    }
  }

  res.send(song);
});

app.listen(PORT);
console.log(`Server listening on port ${PORT}`);
