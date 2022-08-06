import { mockRequest, mockResponse, mockService } from "../mocks/mocks";
import { sessionsControllerFactory } from "./sessions.controller";

afterEach(() => {
  jest.restoreAllMocks();
});

test("should get all sessions from service and send it as json response", async () => {
  await sessionsControllerFactory(mockService).findAll(
    mockRequest,
    mockResponse
  );
  expect(mockService.findAll).toHaveBeenCalled();
  expect(mockResponse.json).toHaveBeenCalledWith({
    data: "mockResults",
  });
});

test("should handle the query params in findAll", async () => {
  await sessionsControllerFactory(mockService).findAll(
    { ...mockRequest, query: { activity_id: "1", month: "1" } },
    mockResponse
  );
  expect(mockService.findAll).toHaveBeenCalledWith({
    activity_id: "1",
    month: "1",
  });
  expect(mockResponse.json).toHaveBeenCalledWith({
    data: "mockResults",
  });
});

test("should find a session from service and send it as json response", async () => {
  await sessionsControllerFactory(mockService).findOne(
    mockRequest,
    mockResponse
  );
  expect(mockService.findOne).toHaveBeenCalledWith(1);
  expect(mockResponse.json).toHaveBeenCalledWith({
    data: "mockResults",
  });
});

test("should create a new session from service and send it as json response", async () => {
  await sessionsControllerFactory(mockService).create(
    mockRequest,
    mockResponse
  );
  const { body } = mockRequest;
  expect(mockService.create).toHaveBeenCalledWith(body);
  expect(mockResponse.json).toHaveBeenCalledWith({
    data: "mockResults",
  });
});

test("should update a session from service and send it as json response", async () => {
  await sessionsControllerFactory(mockService).update(
    mockRequest,
    mockResponse
  );
  const { body } = mockRequest;
  expect(mockService.update).toHaveBeenCalledWith(1, body);
  expect(mockResponse.json).toHaveBeenCalledWith({
    data: "mockResults",
  });
});

test("should delete a session from service and send it as json response", async () => {
  await sessionsControllerFactory(mockService).delete(
    mockRequest,
    mockResponse
  );
  const { body } = mockRequest;
  expect(mockService.delete).toHaveBeenCalledWith(1);
  expect(mockResponse.json).toHaveBeenCalledWith({
    data: "mockResults",
  });
});
