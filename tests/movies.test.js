const app = require("../app");
const request = require("supertest");

describe("routes/movies", () => {
  it("POST /movies should return a new movie object", () => {
    const requestBody = { name: "test movie", artist: "rhianna" };
    const responseBody = { id: 1, name: "test movie", artist: "rhianna" };

    return request(app)
      .post("/movies")
      .send(requestBody)

      .then(response => {
        expect(response.status).toEqual(201);
        expect(response.body).toEqual(responseBody);
      });
  });

  it("GET /movies should return an array with one element", () => {
    return request(app)
      .get("/movies")

      .then(response => {
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toEqual(true);
        expect(response.body.length).toEqual(1);
      });
  });

  it("GET /movies/:id should return the movie with id", () => {
    const responseBody = { name: "test movie", artist: "rhianna" };

    return request(app)
      .get("/movies/1")

      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body).toMatchObject(responseBody);
      });
  });

  it("PUT /movies should return the updated movie", () => {
    const requestBody = { name: "updated movie", artist: "rhianna" };
    const responseBody = { id: 1, name: "updated movie", artist: "rhianna" };

    return request(app)
      .put("/movies/1")
      .send(requestBody)

      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(responseBody);
      });
  });

  it("DELETE /movies/:id should return the deleted movie", () => {
    const responseBody = { id: 1, name: "updated movie", artist: "rhianna" };

    return request(app)
      .delete("/movies/1")

      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body).toEqual(responseBody);
      });
  });

  it("GET /movies should return an empty array", () => {
    return request(app)
      .get("/movies")

      .then(response => {
        expect(response.status).toEqual(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toEqual(0);
      });
  });

  it("throws an error if user inputs an invalid id for GET /movies", async () => {
    const response = await request(app).get("/movies/a");

    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual("Unable to find movie with id : a");
  });

  it("throws an error if user inputs an invalid id for PUT /movies", async () => {
    const response = await request(app).put("/movies/a");

    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual("Unable to find movie with id : a");
  });

  it("throws an error if user inputs an invalid id for DELETE /movies", async () => {
    const response = await request(app).delete("/movies/a");

    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual("Unable to find movie with id : a");
  });
});
