import { mockRepository } from '../../mocks/mocks';
import { activitiesServiceFactory } from './activities.service';

test("should get all activities from repository and send it as json response", async () => {
  await activitiesServiceFactory(mockRepository).findAll();
  expect(mockRepository.findAll).toHaveBeenCalled();
});

test("should find a activity from repository and send it as json response", async () => {
  await activitiesServiceFactory(mockRepository).findOne(1);
  expect(mockRepository.findOne).toHaveBeenCalledWith(1);
});

test("should create a new activity from repository and send it as json response", async () => {
  const body = {
    name: "test",
    age: 20,
  };
  await activitiesServiceFactory(mockRepository).create(body);
  expect(mockRepository.create).toHaveBeenCalledWith(body);
});

test("should update a activity from repository and send it as json response", async () => {
  const body = {
    name: "test",
    age: 20,
  };
  await activitiesServiceFactory(mockRepository).update(1, body);
  expect(mockRepository.update).toHaveBeenCalledWith(1, body);
});

test("should delete a activity from repository and send it as json response", async () => {
  await activitiesServiceFactory(mockRepository).delete(1);
  expect(mockRepository.delete).toHaveBeenCalledWith(1);
});
