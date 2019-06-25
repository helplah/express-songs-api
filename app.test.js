const request = require("supertest");
const app = require("./app");

let songs = [
  { id: 1, name: "In The End", artist: "LinkinPark" },
  { id: 2, name: "Numb", artist: "LinkinPark" },
  {
    id: 3,
    name: "CircleCI replaces Heroku continuous intergration",
    artist: "Jesstern Rays"
  }
];

describe("App", () => {
  it("GET / should return an array of songs", async () => {
    const response = await request(app).get("/");
    expect(response.body).toEqual(songs);

    // return request(app)
    //   .get("/")
    //   .then(res => res)
    //   .expect(res => res.body)
    //   .toEqual(songs);
  });
});
