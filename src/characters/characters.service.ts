export const charactersServiceFactory = (repository: any) => ({
  findAll: async () => {
    try {
      return await repository.findAll();
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  findOne: async (id: number) => {
    try {
      return await repository.findOne(id);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  create: async (body: any) => {
    try {
      return await repository.create(body);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  update: async (id: number, body: any) => {
    try {
      return await repository.update(id, body);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  delete: async (id: number) => {
    try {
      return await repository.delete(id);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
});
