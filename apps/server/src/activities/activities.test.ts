import request from "supertest";
import { app, connection } from "../";

const body = { name: "activity", duration: "1", character_id: 1 };
const updateBody = { name: "activity_update", duration: "2", character_id: 1 };

// TODO: add proper integration testing using docker and verdaccio
describe("activities", function () {
  beforeAll(async () => {
    await request(app).post("/v1/characters").send({ name: "test", age: 20 });
  });

  it("should get all activities", async function () {
    // Seed one user
    await request(app).post("/v1/activities").send(body);
    const response = await request(app)
      .get("/v1/activities")
      .set("Accept", "application/json");
    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.status).toEqual(200);
    expect(response.body[0].name).toEqual("activity");
  });

  it("should create a new activities", async function () {
    const response = await request(app)
      .post("/v1/activities")
      .send(body)
      .set("Accept", "application/json")
      .expect((res) => {
        res.body.activity_id = "some fixed id";
        res.body.name = res.body.name.toLowerCase();
      });

    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        activity_id: "some fixed id",
        name: "activity",
      })
    );
  });

  it("should get one activity", async () => {
    const createResponse = await request(app).post("/v1/activities").send(body);
    const response = await request(app)
      .get(`/v1/activities/${createResponse.body.activity_id}`)
      .set("Accept", "application/json");
    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual("activity");
  });

  it("should update one activity", async () => {
    const createResponse = await request(app).post("/v1/activities").send(body);
    const response = await request(app)
      .put(`/v1/activities/${createResponse.body.activity_id}`)
      .send(updateBody)
      .set("Accept", "application/json");
    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual("activity_update");
  });

  it("should delete one activity", async () => {
    const createResponse = await request(app).post("/v1/activities").send(body);
    const response = await request(app)
      .delete(`/v1/activities/${createResponse.body.activity_id}`)
      .set("Accept", "application/json");
    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.status).toEqual(200);
    expect(response.body).toBeFalsy();

    // Check removed
    const responseGet = await request(app)
      .get(`/v1/activities/${response.body.activity_id}`)
      .set("Accept", "application/json");
    expect(responseGet.body).toBeFalsy();
  });

  // TODO: extract to utility functions
  const closeServer = async () => {
    // TODO: add all tables in setupFiles ?
    // TODO: find a way to make it secure
    // await connection.execute("SET FOREIGN_KEY_CHECKS = 0");
    await connection.execute(
      "SELECT Concat('TRUNCATE TABLE ', TABLE_NAME) FROM INFORMATION_SCHEMA.TABLES"
      // "DELETE FROM activities"
    );
    // await connection.execute(
    //   // "SELECT Concat('TRUNCATE TABLE ', TABLE_NAME) FROM INFORMATION_SCHEMA.TABLES"
    //   "ALTER TABLE activities AUTO_INCREMENT = 1;"
    // );
    await connection.end();
  };

  afterAll(async () => {
    await closeServer();
  });
});
