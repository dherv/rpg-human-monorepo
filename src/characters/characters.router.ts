import { Router } from 'express';
import { charactersControllerFactory } from './characters.controller';
import { charactersRepositoryFactory } from './characters.repository';
import { charactersServiceFactory } from './characters.service';

export const charactersRouter = (connection: any) => {
  const charactersRouter = Router();
  const charactersRepository = charactersRepositoryFactory(connection);
  const charactersService = charactersServiceFactory(charactersRepository);
  const charactersController = charactersControllerFactory(charactersService);

  charactersRouter.get("/", charactersController.findAll);
  charactersRouter.get("/:id", charactersController.findOne);
  charactersRouter.post("/", charactersController.create);
  charactersRouter.put("/:id", charactersController.update);
  charactersRouter.delete("/:id", charactersController.delete);

  return charactersRouter;
};
