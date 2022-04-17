import { mockRequest, mockResponse, mockService } from '../../mocks/mocks';
import { activitiesControllerFactory } from './activities.controller';

test("should get all activities from service and send it as json response", async () => {
  await activitiesControllerFactory(mockService).findAll(
    mockRequest,
    mockResponse
  );
  expect(mockService.findAll).toHaveBeenCalled();
  expect(mockResponse.json).toHaveBeenCalledWith({
    data: "mockResults",
  });
});

test("should find a activity from service and send it as json response", async () => {
  await activitiesControllerFactory(mockService).findOne(
    mockRequest,
    mockResponse
  );
  expect(mockService.findOne).toHaveBeenCalledWith(1);
  expect(mockResponse.json).toHaveBeenCalledWith({
    data: "mockResults",
  });
});

test("should create a new activity from service and send it as json response", async () => {
  await activitiesControllerFactory(mockService).create(
    mockRequest,
    mockResponse
  );
  const { body } = mockRequest;
  expect(mockService.create).toHaveBeenCalledWith(body);
  expect(mockResponse.json).toHaveBeenCalledWith({
    data: "mockResults",
  });
});

test("should update a activity from service and send it as json response", async () => {
  await activitiesControllerFactory(mockService).update(
    mockRequest,
    mockResponse
  );
  const { body } = mockRequest;
  expect(mockService.update).toHaveBeenCalledWith(1, body);
  expect(mockResponse.json).toHaveBeenCalledWith({
    data: "mockResults",
  });
});

test("should delete a activity from service and send it as json response", async () => {
  await activitiesControllerFactory(mockService).delete(
    mockRequest,
    mockResponse
  );
  const { body } = mockRequest;
  expect(mockService.delete).toHaveBeenCalledWith(1);
  expect(mockResponse.json).toHaveBeenCalledWith({
    data: "mockResults",
  });
});
