const app = require("../app");
const request = require("supertest");

//Fill in the test case below for the Songs API

describe("routes/songs", () => {
  it("POST /songs should return a new song object", () => {
    requestBody = { name: "test song", artist: "rhianna" };

    return request(app)
      .post("/songs")
      .send(requestBody)

      .then(response => {
        expect(response.status).toEqual(201);
        expect(response.body).toMatchObject(requestBody);
      });
  });
  it("GET /songs should return a non empty array", () => {
    return request(app)
      .get("/")
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body).not.toEqual([]);
      });
  });

  // can't post song and get it successfully
  it("GET /songs/:id should return song with id specified", () => {
    requestBody = { name: "test song", artist: "rhianna" };

    request(app)
      .post("/songs")
      .send(requestBody);

    return request(app)
      .get("/songs/1")
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({ name: "test song", artist: "rhianna" });
      });
  });

  it.only("PUT /songs/:id should return the updated song", () => {
    return request(app)
      .put("/songs/1")
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({ name: "test song", artist: "rhianna" });
      });
  });

  it("DELETE /songs/:id should return the deleted song", () => {});

  it("GET /songs should return an empty array", () => {});
});
