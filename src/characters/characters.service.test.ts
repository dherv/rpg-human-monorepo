import { mockRepository } from '../../mocks/mocks';
import { charactersServiceFactory } from './characters.service';

test("should get all characters from repository and send it as json response", async () => {
  await charactersServiceFactory(mockRepository).findAll();
  expect(mockRepository.findAll).toHaveBeenCalled();
});

test("should find a character from repository and send it as json response", async () => {
  await charactersServiceFactory(mockRepository).findOne(1);
  expect(mockRepository.findOne).toHaveBeenCalledWith(1);
});

test("should create a new character from repository and send it as json response", async () => {
  const body = {
    name: "test",
    age: 20,
  };
  await charactersServiceFactory(mockRepository).create(body);
  expect(mockRepository.create).toHaveBeenCalledWith(body);
});

test("should update a character from repository and send it as json response", async () => {
  const body = {
    name: "test",
    age: 20,
  };
  await charactersServiceFactory(mockRepository).update(1, body);
  expect(mockRepository.update).toHaveBeenCalledWith(1, body);
});

test("should delete a character from repository and send it as json response", async () => {
  await charactersServiceFactory(mockRepository).delete(1);
  expect(mockRepository.delete).toHaveBeenCalledWith(1);
});
