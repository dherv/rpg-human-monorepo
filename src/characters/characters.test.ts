import request from 'supertest';
import { app, connection, server } from '../';

describe("GET /characters", function () {
  it("get all characters", async function () {
    const response = await request(app)
      .get("/v1/characters")
      .set("Accept", "application/json");
    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual("Bob");
  });

  it("creates a new characters", async function () {
    const response = await request(app)
      .post("/v1/characters")
      .set("Accept", "application/json")
      .expect((res) => {
        res.body.character_id = "some fixed id";
        res.body.name = res.body.name.toLowerCase();
      });

    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({ character_id: "some fixed id", name: "bob" })
    );
  });

  afterAll(async () => {
    server.close();
    await connection.end();
    console.log("... Test Ended");
  });
});
