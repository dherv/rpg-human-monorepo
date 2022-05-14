import { Request, Response } from 'express';
import { sessionsServiceFactory } from './sessions.service';
import { SessionsQueryParams } from './sessions.types';

export const sessionsControllerFactory = (
  service: ReturnType<typeof sessionsServiceFactory>
) => ({
  findAll: async (req: Request, res: Response) => {
    try {
      const { activity_id, month, year } = req.query || {};
      const queryParams: SessionsQueryParams = {
        activity_id: activity_id?.toString(),
        month: month?.toString(),
        year: year?.toString(),
      };
      const sessions = await service.findAll(queryParams);
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
