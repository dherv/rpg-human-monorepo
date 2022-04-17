import request from 'supertest';
import { app, connection } from '../';

const body = {
  duration: "1",
  date: "2022/01/01",
  improvement: "improvement",
  proud: "proud",
  character_id: 1,
  activity_id: 1,
};
const updateBody = {
  duration: "2",
  date: "2022/01/01",
  note: "session_update",
  improvement: "improvement",
  proud: "proud",
  character_id: 1,
  activity_id: 1,
};

// TODO: add proper integration testing using docker and verdaccio
describe("sessions", function () {
  beforeAll(async () => {
    // Seed one user
    await request(app).post("/v1/characters").send({ name: "test", age: 20 });
    await request(app)
      .post("/v1/activities")
      .send({ name: "activity", duration: "1", character_id: 1 });
  });

  it("should create a new session", async function () {
    const response = await request(app)
      .post("/v1/sessions")
      .send(body)
      .set("Accept", "application/json")
      .expect((res) => {
        console.log(res.body);
        res.body.session_id = "some fixed id";
      });

    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.status).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        session_id: "some fixed id",
        date: "2021-12-31T15:00:00.000Z",
      })
    );
  });

  it("should get all sessions", async function () {
    const response = await request(app)
      .get("/v1/sessions")
      .set("Accept", "application/json");
    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.status).toEqual(200);
    expect(response.body[0].date).toEqual("2021-12-31T15:00:00.000Z");
  });

  it("should get one session", async () => {
    const createResponse = await request(app).post("/v1/sessions").send(body);
    const response = await request(app)
      .get(`/v1/sessions/${createResponse.body.session_id}`)
      .set("Accept", "application/json");
    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.status).toEqual(200);
    expect(response.body.date).toEqual("2021-12-31T15:00:00.000Z");
  });

  it("should update one session", async () => {
    const createResponse = await request(app).post("/v1/sessions").send(body);
    const response = await request(app)
      .put(`/v1/sessions/${createResponse.body.session_id}`)
      .send(updateBody)
      .set("Accept", "application/json");
    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.status).toEqual(200);
    expect(response.body.note).toEqual("session_update");
  });

  it("should delete one session", async () => {
    const createResponse = await request(app).post("/v1/sessions").send(body);
    const response = await request(app)
      .delete(`/v1/sessions/${createResponse.body.session_id}`)
      .set("Accept", "application/json");
    expect(response.headers["content-type"]).toContain("application/json");
    expect(response.status).toEqual(200);
    expect(response.body).toBeFalsy();

    // Check removed
    const responseGet = await request(app)
      .get(`/v1/sessions/${response.body.session_id}`)
      .set("Accept", "application/json");
    expect(responseGet.body).toBeFalsy();
  });

  // TODO: extract to utility functions
  const closeServer = async () => {
    // TODO: add all tables in setupFiles ?
    // TODO: find a way to make it secure
    await connection.execute("SET FOREIGN_KEY_CHECKS = 0");
    await connection.execute(
      // "SELECT Concat('TRUNCATE TABLE ', TABLE_NAME) FROM INFORMATION_SCHEMA.TABLES"
      "TRUNCATE TABLE sessions"
    );
    await connection.end();
    console.log("... Test Ended");
  };

  afterAll(async () => {
    await closeServer();
  });
});
