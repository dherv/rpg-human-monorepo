import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';

const TABLE = `characters`;
const PRIMARY_KEY = `character_id`;

export const charactersRepositoryFactory = (pool: Pool) => ({
  findAll: async (): Promise<any> => {
    try {
      const [rows] = await pool.query(
        `SELECT *, character_id as characterId FROM characters`
      );
      return rows;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  findOne: async (id: number) => {
    try {
      const [rows] = (await pool.query(
        `SELECT *, character_id as characterId FROM ${TABLE} WHERE ${PRIMARY_KEY} = ? LIMIT 1`,
        [id]
      )) as RowDataPacket[];
      const character = rows[0];
      return character;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  create: async (body: any) => {
    try {
      // TODO: add proper validation
      if (!body.name || !body.age) {
        throw new Error("body not defined");
      }
      // Insert
      const [result] = await pool.execute(
        `INSERT INTO ${TABLE} (name, age) VALUES (?, ?)`,
        [body.name, body.age]
      );
      const { insertId } = result as ResultSetHeader;

      // Get new item
      const [rows] = (await pool.query(
        `SELECT *, character_id as characterId FROM ${TABLE} WHERE ${PRIMARY_KEY} = ${insertId} LIMIT 1`
      )) as RowDataPacket[];
      const character = rows[0];

      return character;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  update: async (id: number, body: any) => {
    try {
      if (!body.name || !body.age) {
        throw new Error("body not defined");
      }
      // Update
      await pool.execute(
        `UPDATE ${TABLE} SET name = ?, age = ? WHERE ${PRIMARY_KEY} = ?`,
        [body.name, body.age, id]
      );

      // GET new item
      const [rows] = (await pool.query(
        `SELECT *, character_id as characterId FROM ${TABLE} WHERE ${PRIMARY_KEY} = ? LIMIT 1`,
        [id]
      )) as RowDataPacket[];
      const character = rows[0];
      return character;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  delete: async (id: number) => {
    try {
      await pool.execute(`DELETE FROM ${TABLE} WHERE ${PRIMARY_KEY} = ?`, [id]);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
});
