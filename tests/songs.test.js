const app = require("../app");
const request = require("supertest");

//Fill in the test case below for the Songs API

describe("routes/songs", () => {
  const mockData = { id: 1, name: "test song", artist: "rihanna" };

  it("POST /songs should return a new song object", async () => {
    const response = await request(app)
      .post("/songs")
      .send(mockData);

    expect(response.status).toEqual(201);
    expect(response.body).toMatchObject(mockData);
  });

  it("GET /songs should return a non empty array", async () => {
    const response = await request(app).get("/songs");

    expect(response.status).toEqual(200);
    expect(response.body).not.toEqual([]);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toMatchObject(mockData);
  });

  it("GET /songs/:id should return song with id specified", async () => {
    const response = await request(app).get("/songs/1");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual(mockData);
  });

  it("PUT /songs/:id should return the updated song", async () => {
    const updatedMockData = { id: 1, name: "Umbrella", artist: "Rihanna" };

    const response = await request(app)
      .put("/songs/1")
      .send(updatedMockData) // x-www-form-urlencoded upload
      .set("Accept", "application/json");

    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(updatedMockData.id);
    expect(response.body).toMatchObject(updatedMockData);
  });

  it("DELETE /songs/:id should return the deleted song", async () => {
    const response = await request(app).delete("/songs/1");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      id: 1,
      name: "Umbrella",
      artist: "Rihanna"
    });
  });

  it("GET /songs should return an empty array", async () => {
    const response = await request(app).get("/songs");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual([]); // also can be Elson prefers toBeTruthy
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body).toHaveLength(0);
  });
});
