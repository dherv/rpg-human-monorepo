import { Pool, ResultSetHeader, RowDataPacket } from 'mysql2/promise'
import { formatDateTime } from '../helpers'
import { SessionsQueryParams } from './sessions.types'

const TABLE = `sessions`
const PRIMARY_KEY = `session_id`
const SELECT_MAIN = `SELECT *, session_id as sessionId, activity_id as activityId, character_id as characterId`

export const sessionsRepositoryFactory = (pool: Pool) => ({
  // TODO: replace by type once types shared in monorepo
  findAll: async (filters?: SessionsQueryParams): Promise<unknown> => {
    try {
      // query
      const [rows] = (await pool.query(
        `
        ${SELECT_MAIN}, MONTH(date) as sessionMonth, YEAR(date) as sessionYear
        FROM sessions
        WHERE activity_id = IFNULL(?, activity_id)
        HAVING sessionMonth = IFNULL(?, sessionMonth) 
        AND sessionYear = IFNULL(?, sessionYear)
        `,
        [
          filters?.activityId ?? null,
          filters?.month ?? null,
          filters?.year ?? null,
        ]
      )) as RowDataPacket[][]

      // relation
      const rowsMap = rows.map(async (session) => {
        const [activities] = (await pool.query(
          `SELECT *, activity_id as activityId, character_id as characterId FROM activities WHERE activity_id = ${session.activityId} LIMIT 1`
        )) as RowDataPacket[]
        return { ...session, activity: activities[0] }
      })

      return Promise.all(rowsMap)
    } catch (error) {
      console.error(error)
      return error
    }
  },
  findOne: async (id: string) => {
    try {
      const [rows] = (await pool.query(
        `${SELECT_MAIN} FROM ${TABLE} WHERE ${PRIMARY_KEY} = ? LIMIT 1`,
        [id]
      )) as RowDataPacket[]
      const session = rows[0]

      if (session) {
        const [activities] = (await pool.query(
          `SELECT *, activity_id as activityId, character_id as characterId FROM activities WHERE activity_id = ${session.activityId} LIMIT 1`
        )) as RowDataPacket[]
        return { ...session, activity: activities[0] }
      }
      return undefined
    } catch (error) {
      console.error(error)
      return error
    }
  },
  // TODO: add proper types

  create: async (body: {
    duration: number
    date: string
    characterId: number
    activityId: number
    note?: string
    proud?: string
    improvement?: string
  }) => {
    try {
      // TODO: add proper validation
      if (
        !body.duration ||
        !body.date ||
        !body.characterId ||
        !body.activityId
      ) {
        throw new Error('body not defined')
      }

      const formatDate = formatDateTime(body.date)

      // TODO: insert only of character exists
      // Insert
      const [result] = await pool.execute(
        `INSERT INTO ${TABLE} (duration, date, note, improvement, proud, character_id, activity_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          body.duration,
          formatDate,
          body.note ?? null,
          body.improvement ?? null,
          body.proud ?? null,
          body.characterId,
          body.activityId,
        ]
      )
      const { insertId } = result as ResultSetHeader

      // Get new item
      const [rows] = (await pool.query(
        `${SELECT_MAIN} FROM ${TABLE} WHERE ${PRIMARY_KEY} = ${insertId} LIMIT 1`
      )) as RowDataPacket[]
      const session = rows[0]

      return session
    } catch (error) {
      console.error(error)
      return error
    }
  },
  update: async (
    id: string,
    body: {
      duration: number
      date: string
      characterId: number
      activityId: number
      note?: string
      proud?: string
      improvement?: string
    }
  ) => {
    try {
      if (
        !body.duration ||
        !body.date ||
        !body.characterId ||
        !body.activityId
      ) {
        throw new Error('body not defined')
      }

      const formatDate = formatDateTime(body.date)

      // TODO: update only if character exists
      // Update
      await pool.execute(
        `UPDATE ${TABLE} SET duration = ?, date = ?, note = ?, improvement = ?, proud = ? WHERE ${PRIMARY_KEY} = ?`,
        [
          body.duration,
          formatDate,
          body.note || null,
          body.improvement || null,
          body.proud || null,
          id,
        ]
      )

      // GET new item
      const [rows] = (await pool.query(
        `${SELECT_MAIN} FROM ${TABLE} WHERE ${PRIMARY_KEY} = ? LIMIT 1`,
        [id]
      )) as RowDataPacket[]
      const session = rows[0]
      return session
    } catch (error) {
      console.error(error)
      return error
    }
  },
  delete: async (id: string) => {
    try {
      await pool.execute(`DELETE FROM ${TABLE} WHERE ${PRIMARY_KEY} = ?`, [id])
    } catch (error) {
      console.error(error)
      return error
    }
  },
})
