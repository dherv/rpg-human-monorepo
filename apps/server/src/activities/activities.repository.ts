import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';

const TABLE = `activities`;
const PRIMARY_KEY = `activity_id`;
const SELECT_MAIN = `SELECT *, activity_id as activityId`;
const SELECT_MAIN_SESSION = `SELECT *, session_id as sessionId, activity_id as activityId, character_id as characterId`;

export const activitiesRepositoryFactory = (pool: Pool) => ({
  findAll: async (): Promise<any> => {
    try {
      const [activities] = (await pool.query(
        `${SELECT_MAIN} FROM activities`
      )) as RowDataPacket[][];
      const result = activities.map(async (activity) => {
        // get relationship
        const [sessions] = (await pool.query(
          `${SELECT_MAIN_SESSION} FROM sessions s WHERE ${PRIMARY_KEY} = ?`,
          [activity.activityId]
        )) as RowDataPacket[];
        return { ...activity, sessions };
      });
      return Promise.all(result);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  findOne: async (id: number) => {
    try {
      const [rows] = (await pool.query(
        `${SELECT_MAIN} FROM ${TABLE} WHERE ${PRIMARY_KEY} = ? LIMIT 1`,
        [id]
      )) as RowDataPacket[];
      const activity = rows[0];

      // get relationship
      const [sessions] = (await pool.query(
        `${SELECT_MAIN_SESSION} FROM sessions s WHERE ${PRIMARY_KEY} = ?`,
        [id]
      )) as RowDataPacket[];

      return activity ? { ...activity, sessions } : undefined;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  // TODO: add proper types
  create: async (body: any) => {
    try {
      // TODO: add proper validation
      if (!body.name || !body.character_id || !body.duration) {
        throw new Error("body not defined");
      }

      // TODO: insert only of character exists
      // Insert
      const [result] = await pool.execute(
        `INSERT INTO ${TABLE} (name, duration, character_id) VALUES (?, ?, ?)`,
        [body.name, body.duration, body.character_id]
      );
      const { insertId } = result as ResultSetHeader;

      // Get new item
      const [rows] = (await pool.query(
        `${SELECT_MAIN} FROM ${TABLE} WHERE ${PRIMARY_KEY} = ${insertId} LIMIT 1`
      )) as RowDataPacket[];
      const activity = rows[0];

      return activity;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  update: async (id: number, body: any) => {
    try {
      if (!body.name || !body.character_id || !body.duration) {
        throw new Error("body not defined");
      }
      // TODO: update only if character exists
      // Update
      await pool.execute(
        `UPDATE ${TABLE} SET name = ?, character_id = ?, duration = ? WHERE ${PRIMARY_KEY} = ?`,
        [body.name, body.character_id, body.duration, id]
      );

      // GET new item
      const [rows] = (await pool.query(
        `${SELECT_MAIN} FROM ${TABLE} WHERE ${PRIMARY_KEY} = ? LIMIT 1`,
        [id]
      )) as RowDataPacket[];
      const activity = rows[0];
      return activity;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  delete: async (id: string) => {
    try {
      await pool.execute(`DELETE FROM ${TABLE} WHERE ${PRIMARY_KEY} = ?`, [id]);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
});
