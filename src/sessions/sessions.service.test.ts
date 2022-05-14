import { mockRepository } from '../../mocks/mocks';
import { sessionsServiceFactory } from './sessions.service';

afterEach(() => jest.restoreAllMocks());

test("should get all sessions from repository and send it as json response", async () => {
  await sessionsServiceFactory(mockRepository).findAll();
  expect(mockRepository.findAll).toHaveBeenCalledWith(undefined);
});

test("should get all sessions from repository and send it as json response", async () => {
  const queryParams = {
    activity_id: "1",
    month: "4",
  };
  await sessionsServiceFactory(mockRepository).findAll(queryParams);
  expect(mockRepository.findAll).toHaveBeenCalledWith(queryParams);
});

test("should find a session from repository and send it as json response", async () => {
  await sessionsServiceFactory(mockRepository).findOne("1");
  expect(mockRepository.findOne).toHaveBeenCalledWith("1");
});

test("should create a new session from repository and send it as json response", async () => {
  const body = {
    name: "test",
    age: 20,
  };
  await sessionsServiceFactory(mockRepository).create(body);
  expect(mockRepository.create).toHaveBeenCalledWith(body);
});

test("should update a session from repository and send it as json response", async () => {
  const body = {
    name: "test",
    age: 20,
  };
  await sessionsServiceFactory(mockRepository).update("1", body);
  expect(mockRepository.update).toHaveBeenCalledWith("1", body);
});

test("should delete a session from repository and send it as json response", async () => {
  await sessionsServiceFactory(mockRepository).delete("1");
  expect(mockRepository.delete).toHaveBeenCalledWith("1");
});
