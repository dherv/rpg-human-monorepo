import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { sqlInclude } from '../helpers';
import { SessionsQueryParams } from './sessions.types';

const TABLE = `sessions`;
const PRIMARY_KEY = `session_id`;

export const sessionsRepositoryFactory = (pool: Pool) => ({
  findAll: async (filters?: SessionsQueryParams): Promise<any> => {
    try {
      // query
      const [rows] = (await pool.query(
        `
        SELECT *, MONTH(date) as sessionMonth, YEAR(date) as sessionYear
        FROM sessions
        WHERE activity_id = IFNULL(?, activity_id)
        HAVING sessionMonth = IFNULL(?, sessionMonth) 
        AND sessionYear = IFNULL(?, sessionYear)
        `,
        [
          filters?.activity_id ?? null,
          filters?.month ?? null,
          filters?.year ?? null,
        ]
      )) as RowDataPacket[][];

      // relation
      const rowsMap = rows.map(async (session) => {
        return sqlInclude({
          pool,
          item: session,
          table: "activities",
          primaryKey: "activity_id",
          primaryKeyValue: session.activity_id,
        });
      });

      return Promise.all(rowsMap);
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  findOne: async (id: string) => {
    try {
      const [rows] = (await pool.query(
        `SELECT * FROM ${TABLE} WHERE ${PRIMARY_KEY} = ? LIMIT 1`,
        [id]
      )) as RowDataPacket[];
      const session = rows[0];
      return session
        ? sqlInclude({
            pool,
            item: session,
            table: "activities",
            primaryKey: "activity_id",
            primaryKeyValue: session.activity_id,
          })
        : undefined;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  // TODO: add proper types

  create: async (body: any) => {
    try {
      // TODO: add proper validation
      if (
        !body.duration ||
        !body.date ||
        !body.character_id ||
        !body.activity_id
      ) {
        throw new Error("body not defined");
      }

      // TODO: insert only of character exists
      // Insert
      const [result] = await pool.execute(
        `INSERT INTO ${TABLE} (duration, date, note, improvement, proud, character_id, activity_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          body.duration,
          body.date,
          body.note ?? null,
          body.improvement ?? null,
          body.proud ?? null,
          body.character_id,
          body.activity_id,
        ]
      );
      const { insertId } = result as ResultSetHeader;

      // Get new item
      const [rows] = (await pool.query(
        `SELECT * FROM ${TABLE} WHERE ${PRIMARY_KEY} = ${insertId} LIMIT 1`
      )) as RowDataPacket[];
      const session = rows[0];

      return session;
    } catch (error) {
      console.error(error);
      return error;
    }
  },
  update: async (id: string, body: any) => {
    try {
      if (
        !body.duration ||
        !body.date ||
        !body.character_id ||
        !body.activity_id
      ) {
        throw new Error("body not defined");
      }
      // TODO: update only if character exists
      // Update
      await pool.execute(
        `UPDATE ${TABLE} SET duration = ?, date = ?, note = ?, improvement = ?, proud = ? WHERE ${PRIMARY_KEY} = ?`,
        [
          body.duration,
          body.date,
          body.note || null,
          body.improvement || null,
          body.proud || null,
          id,
        ]
      );

      // GET new item
      const [rows] = (await pool.query(
        `SELECT * FROM ${TABLE} WHERE ${PRIMARY_KEY} = ? LIMIT 1`,
        [id]
      )) as RowDataPacket[];
      const session = rows[0];
      return session;
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
