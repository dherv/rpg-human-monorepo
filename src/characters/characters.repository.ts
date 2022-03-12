export const charactersRepositoryFactory = () => ({
  get: async () => {
    try {
      console.log("work in progress");
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  getOne: async (id: number) => {
    try {
      return await Promise.resolve({
        id,
        name: "Bob",
        physical: 1,
        mental: 1,
        courage: 1,
        active: 2,
      });
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  create: async (req: Request, res: Response) => {
    try {
      console.log("work in progress");
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
