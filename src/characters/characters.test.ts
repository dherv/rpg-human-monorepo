import request from 'supertest';
import { app, connection, server } from '../';

const body = { name: "test", age: 20 };
const updateBody = { name: "test", age: 40 };

describe("GET /characters", function () {
  it("should get all characters", async function () {
    // Seed one user
    await request(app).post("/v1/characters").send(body);
    const response = await request(app)
      .get("/v1/characters")
      .set("Accept", "application/json");
    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual("test");
  });

  it("should create a new characters", async function () {
    const response = await request(app)
      .post("/v1/characters")
      .send(body)
      .set("Accept", "application/json")
      .expect((res) => {
        res.body.character_id = "some fixed id";
        res.body.name = res.body.name.toLowerCase();
      });

    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({ character_id: "some fixed id", name: "test" })
    );
  });

  it("should get one character", async () => {
    const createResponse = await request(app).post("/v1/characters").send(body);
    const response = await request(app)
      .get(`/v1/characters/${createResponse.body.character_id}`)
      .set("Accept", "application/json");
    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual("test");
  });

  it("should update one character", async () => {
    const createResponse = await request(app).post("/v1/characters").send(body);
    const response = await request(app)
      .put(`/v1/characters/${createResponse.body.character_id}`)
      .send(updateBody)
      .set("Accept", "application/json");
    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual("test");
  });

  it("should delete one character", async () => {
    const createResponse = await request(app).post("/v1/characters").send(body);
    const response = await request(app)
      .delete(`/v1/characters/${createResponse.body.character_id}`)
      .set("Accept", "application/json");
    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.status).toEqual(200);
    expect(response.body).toBeFalsy();

    // Check removed
    const responseGet = await request(app)
      .get(`/v1/characters/${response.body.character_id}`)
      .set("Accept", "application/json");
    expect(responseGet.body).toBeFalsy();
  });

  afterAll(async () => {
    server.close();
    // TODO: add all tables in setupFiles ?
    // TODO: find a way to make it secure
    await connection.execute("SET FOREIGN_KEY_CHECKS = 0");
    await connection.execute(
      // "SELECT Concat('TRUNCATE TABLE ', TABLE_NAME) FROM INFORMATION_SCHEMA.TABLES"
      "TRUNCATE TABLE characters"
    );
    await connection.end();
    console.log("... Test Ended");
  });
});
