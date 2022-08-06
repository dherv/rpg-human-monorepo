import { sessionsRepositoryFactory } from "./sessions.repository";
import { SessionsQueryParams } from "./sessions.types";

export const sessionsServiceFactory = (
  repository: ReturnType<typeof sessionsRepositoryFactory>
) => ({
  findAll: async (queryParams?: SessionsQueryParams) => {
    try {
      return await repository.findAll(queryParams);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  findOne: async (id: string) => {
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
  update: async (id: string, body: any) => {
    try {
      return await repository.update(id, body);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  delete: async (id: string) => {
    try {
      const result = await repository.delete(id);
      return result;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
});
