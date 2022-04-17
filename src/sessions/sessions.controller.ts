import { Request, Response } from 'express';

export const sessionsControllerFactory = (service: any) => ({
  findAll: async (_req: Request, res: Response) => {
    try {
      const sessions = await service.findAll();
      res.json(sessions);
    } catch (error) {
      console.error(error);
      res.json({ error });
    }
  },
  findOne: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const session = await service.findOne(id);
      res.json(session);
    } catch (error) {
      console.error(error);
      res.json({ error });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const session = await service.create(body);
      return res.json(session);
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
      const session = await service.update(id, body);
      return res.json(session);
    } catch (error) {
      console.error(error);
      res.json({ error });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const session = await service.delete(id);
      res.json(session);
    } catch (error) {
      console.error(error);
      res.json({ error });
    }
  },
});
