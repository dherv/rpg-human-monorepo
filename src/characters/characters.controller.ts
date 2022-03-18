import { Request, Response } from 'express';

export const charactersControllerFactory = (service: any) => ({
  findAll: async (_req: Request, res: Response) => {
    try {
      const characters = await service.findAll();
      res.json(characters);
    } catch (error) {
      console.error(error);
      res.json({ error });
    }
  },
  findOne: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const character = await service.findOne(id);
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
  update: async (req: Request, res: Response) => {
    try {
      const {
        body,
        params: { id },
      } = req;
      const character = await service.update(id, body);
      return res.json(character);
    } catch (error) {
      console.error(error);
      res.json({ error });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const character = await service.delete(id);
      res.json(character);
    } catch (error) {
      console.error(error);
      res.json({ error });
    }
  },
});
