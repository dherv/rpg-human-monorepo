import { Router } from 'express';
import { activitiesControllerFactory } from './activities.controller';
import { activitiesRepositoryFactory } from './activities.repository';
import { activitiesServiceFactory } from './activities.service';

export const activitiesRouter = (connection: any) => {
  const activitiesRouter = Router();
  const activitiesRepository = activitiesRepositoryFactory(connection);
  const activitiesService = activitiesServiceFactory(activitiesRepository);
  const activitiesController = activitiesControllerFactory(activitiesService);

  activitiesRouter.get("/", activitiesController.findAll);
  activitiesRouter.get("/:id", activitiesController.findOne);
  activitiesRouter.post("/", activitiesController.create);
  activitiesRouter.put("/:id", activitiesController.update);
  activitiesRouter.delete("/:id", activitiesController.delete);

  return activitiesRouter;
};
