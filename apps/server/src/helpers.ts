import { format } from 'date-fns'
import { Pool, RowDataPacket } from 'mysql2/promise'

interface Include<T, K extends keyof T> {
  pool: Pool
  table: string
  primaryKey: K
  primaryKeyValue: number
  item: T
}
// TODO: to remove
export const sqlInclude = async <T, K extends keyof T>({
  pool,
  item,
  table,
  primaryKey,
  primaryKeyValue,
}: Include<T, K>) => {
  const [rows] = (await pool.query(
    `SELECT * FROM ${table} WHERE ${primaryKey.toString()} = ${primaryKeyValue} LIMIT 1`
  )) as RowDataPacket[]
  return item ? { ...item, activity: rows[0] } : undefined
}

export const formatDateTime = (date: string) =>
  format(new Date(date), 'yyyy-MM-dd hh:mm:ss')
