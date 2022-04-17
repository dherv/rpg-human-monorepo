import { Router } from 'express';
import { sessionsControllerFactory } from './sessions.controller';
import { sessionsRepositoryFactory } from './sessions.repository';
import { sessionsServiceFactory } from './sessions.service';

export const sessionsRouter = (connection: any) => {
  const sessionsRouter = Router();
  const sessionsRepository = sessionsRepositoryFactory(connection);
  const sessionsService = sessionsServiceFactory(sessionsRepository);
  const sessionsController = sessionsControllerFactory(sessionsService);

  sessionsRouter.get("/", sessionsController.findAll);
  sessionsRouter.get("/:id", sessionsController.findOne);
  sessionsRouter.post("/", sessionsController.create);
  sessionsRouter.put("/:id", sessionsController.update);
  sessionsRouter.delete("/:id", sessionsController.delete);

  return sessionsRouter;
};
