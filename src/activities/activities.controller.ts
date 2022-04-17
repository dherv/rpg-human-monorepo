import { Request, Response } from 'express';

export const activitiesControllerFactory = (service: any) => ({
  findAll: async (_req: Request, res: Response) => {
    try {
      const activities = await service.findAll();
      res.json(activities);
    } catch (error) {
      console.error(error);
      res.json({ error });
    }
  },
  findOne: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const activity = await service.findOne(id);
      res.json(activity);
    } catch (error) {
      console.error(error);
      res.json({ error });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const activity = await service.create(body);
      return res.json(activity);
    } catch (error) {
      console.error(error);
      res.json({ error });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      const activity = await service.update(id, body);
      return res.json(activity);
    } catch (error) {
      console.error(error);
      res.json({ error });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const activity = await service.delete(id);
      res.json(activity);
    } catch (error) {
      console.error(error);
      res.json({ error });
    }
  },
});
