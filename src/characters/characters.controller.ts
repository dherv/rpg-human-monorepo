import { Request, Response } from 'express';

export const charactersControllerFactory = (service: any) => ({
  get: async (_req: Request, res: Response) => {
    try {
      const characters = await service.get();
      res.json(characters);
    } catch (error) {
      console.error(error);
      res.json({ error });
    }
  },
  getOne: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const character = await service.getOne(id);
      res.json(character);
    } catch (error) {
      console.error(error);
      res.json({ error });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const character = await service.create(body);
      return res.json(character);
    } catch (error) {
      console.error(error);
      res.json({ error });
    }
  },
  update: async (_req: Request, res: Response) => {
    try {
      console.log("work in progress");
    } catch (error) {
      console.error(error);
      res.json({ error });
    }
  },
  delete: async (_req: Request, res: Response) => {
    try {
      console.log("work in progress");
    } catch (error) {
      console.error(error);
      res.json({ error });
    }
  },
});
