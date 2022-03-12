import { Request, Response } from 'express';

export const charactersControllerFactory = (service: any) => ({
  get: async (req: Request, res: Response) => {
    try {
      console.log("work in progress");
    } catch (error) {
      console.error(error);
      res.json({ error });
    }
  },
  getOne: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const character = await service.getOne(id);
      res.json({ character });
    } catch (error) {
      console.error(error);
      res.json({ error });
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      console.log("work in progress");
    } catch (error) {
      console.error(error);
      res.json({ error });
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      console.log("work in progress");
    } catch (error) {
      console.error(error);
      res.json({ error });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      console.log("work in progress");
    } catch (error) {
      console.error(error);
      res.json({ error });
    }
  },
});
