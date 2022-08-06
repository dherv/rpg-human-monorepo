import { mockRequest, mockResponse, mockService } from "../mocks/mocks";
import { charactersControllerFactory } from "./characters.controller";

test("should get all characters from service and send it as json response", async () => {
  await charactersControllerFactory(mockService).findAll(
    mockRequest,
    mockResponse
  );
  expect(mockService.findAll).toHaveBeenCalled();
  expect(mockResponse.json).toHaveBeenCalledWith({
    data: "mockResults",
  });
});

test("should find a character from service and send it as json response", async () => {
  await charactersControllerFactory(mockService).findOne(
    mockRequest,
    mockResponse
  );
  expect(mockService.findOne).toHaveBeenCalledWith(1);
  expect(mockResponse.json).toHaveBeenCalledWith({
    data: "mockResults",
  });
});

test("should create a new character from service and send it as json response", async () => {
  await charactersControllerFactory(mockService).create(
    mockRequest,
    mockResponse
  );
  const { body } = mockRequest;
  expect(mockService.create).toHaveBeenCalledWith(body);
  expect(mockResponse.json).toHaveBeenCalledWith({
    data: "mockResults",
  });
});

test("should update a character from service and send it as json response", async () => {
  await charactersControllerFactory(mockService).update(
    mockRequest,
    mockResponse
  );
  const { body } = mockRequest;
  expect(mockService.update).toHaveBeenCalledWith(1, body);
  expect(mockResponse.json).toHaveBeenCalledWith({
    data: "mockResults",
  });
});

test("should delete a character from service and send it as json response", async () => {
  await charactersControllerFactory(mockService).delete(
    mockRequest,
    mockResponse
  );
  const { body } = mockRequest;
  expect(mockService.delete).toHaveBeenCalledWith(1);
  expect(mockResponse.json).toHaveBeenCalledWith({
    data: "mockResults",
  });
});
