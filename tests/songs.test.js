const app = require("../app");
const request = require("supertest");

//Fill in the test case below for the Songs API

describe("routes/songs", () => {
  it("POST /songs should return a new song object", async () => {
    requestBody = { name: "test song", artist: "rhianna" };

    const postOneSong = await request(app)
      .post("/songs")
      .send(requestBody);

    expect(postOneSong.status).toEqual(201);
    expect(postOneSong.body).toMatchObject(requestBody);
  });

  it("GET /songs should return a non empty array", async () => {
    requestBody = { name: "test song", artist: "rhianna" };

    const postOneSong = await request(app)
      .post("/songs")
      .send(requestBody);

    const getAllSongs = await request(app).get("/songs");

    expect(getAllSongs.status).toEqual(200);
    expect(getAllSongs.body).not.toEqual([]);
  });

  it("GET /songs/:id should return song with id specified", async () => {
    requestBody = { name: "test song", artist: "rhianna" };

    const postOneSong = await request(app)
      .post("/songs")
      .send(requestBody);

    const getOneSong = await request(app).get("/songs/1");

    expect(getOneSong.status).toEqual(200);
    expect(getOneSong.body).toEqual({
      id: 1,
      name: "test song",
      artist: "rhianna"
    });
  });

  it("PUT /songs/:id should return the updated song", async () => {
    requestBody = { name: "test song", artist: "rhianna" };

    const postOneSong = await request(app)
      .post("/songs")
      .send(requestBody);

    const updateOneSong = await request(app)
      .put("/songs/1")
      .send({ name: "Umbrella", artist: "Rihanna" }) // x-www-form-urlencoded upload
      .set("Accept", "application/json");

    expect(updateOneSong.status).toEqual(200);
    expect(updateOneSong.body).toEqual({
      id: 1,
      name: "Umbrella",
      artist: "Rihanna"
    });
  });

  it.only("DELETE /songs/:id should return the deleted song", async () => {
    requestBody = { name: "test song", artist: "rhianna" };

    const postOneSong = await request(app)
      .post("/songs")
      .send(requestBody);

    const deleteOneSong = await request(app).delete("/songs/1");

    expect(deleteOneSong.status).toEqual(200);
    expect(deleteOneSong.body).toEqual({
      id: 1,
      name: "test song",
      artist: "rhianna"
    });
  });

  it("GET /songs should return an empty array", async () => {
    const getAllSongs = await request(app).get("/songs");

    expect(getAllSongs.status).toEqual(200);
    expect(getAllSongs.body).toEqual([]);
  });
});
