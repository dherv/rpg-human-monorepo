import { Router } from 'express';
import { charactersControllerFactory } from './characters.controller';
import { charactersRepositoryFactory } from './characters.repository';
import { charactersServiceFactory } from './characters.service';

export const charactersRouter = Router();

const charactersRepository = charactersRepositoryFactory();
const charactersService = charactersServiceFactory(charactersRepository);
const charactersController = charactersControllerFactory(charactersService);

charactersRouter.get("/", charactersController.get);
charactersRouter.get("/:id", charactersController.getOne);
charactersRouter.post("/", charactersController.create);
charactersRouter.put("/:id", charactersController.update);
charactersRouter.delete("/:id", charactersController.delete);
