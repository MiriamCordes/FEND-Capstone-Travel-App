const app = require("../src/server/index");
const supertest = require("supertest");
const request = supertest(app);

it("test geonames", (done) => {
  const response = request.get("/travelResult").then((response) => {
    expect(response.statusCode).toBe(200);
    done();
  });
});
