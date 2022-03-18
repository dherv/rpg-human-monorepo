export const charactersServiceFactory = (repository: any) => ({
  get: async (req: Request, res: Response) => {
    try {
      console.log("work in progress");
      return await repository.get();
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  getOne: async (id: number) => {
    try {
      return await repository.getOne(id);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      console.log("work in progress");
      return await repository.create();
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  update: async (req: Request, res: Response) => {
    try {
      console.log("work in progress");
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      console.log("work in progress");
    } catch (error) {
      console.error(error);
      return error;
    }
  },
});
