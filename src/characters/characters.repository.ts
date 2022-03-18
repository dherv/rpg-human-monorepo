import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';

const TABLE = `characters`;
const PRIMARY_KEY = `character_id`;

export const charactersRepositoryFactory = (pool: Pool) => ({
  get: async (): Promise<any> => {
    try {
      const [rows] = await pool.query(`SELECT * FROM characters`);
      return rows;
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
      // Insert
      const [result] = await pool.execute(
        `INSERT INTO characters (name, age) VALUES ("Bob", 40)`
      );
      const { insertId } = result as ResultSetHeader;

      // Get new item
      const [rows] = (await pool.query(
        `SELECT * FROM ${TABLE} WHERE ${PRIMARY_KEY} = ${insertId}`
      )) as RowDataPacket[];

      const character = rows[0];

      return character;
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
