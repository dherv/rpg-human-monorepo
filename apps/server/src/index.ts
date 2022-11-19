/**
 * Required External Modules
 */

import cors from 'cors'
import * as dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import mysql from 'mysql2'
import path from 'path'
import { activitiesRouter } from './activities/activities.router'
import { charactersRouter } from './characters/characters.router'
import { sessionsRouter } from './sessions/sessions.router'

dotenv.config({ path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`) })

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1)
}

const PORT: number = parseInt(process.env.PORT, 10)

const app = express()

/**
 *  App Configuration
 */

app.use(helmet())
app.use(cors())
app.use(express.json())

// TODO: add proper initialization using Preinitialization queue
const connection = mysql
  .createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT
      ? Number(process.env.DATABASE_PORT)
      : undefined,
  })
  .promise()

// API
app.use('/v1/characters', charactersRouter(connection))
app.use('/v1/activities', activitiesRouter(connection))
app.use('/v1/sessions', sessionsRouter(connection))

/**
 * Server Activation
 */

// no need to listen on port for supertest and it might cause already in use issues
// https://stackoverflow.com/questions/60803230/node-eaddrinuse-address-already-in-use-3000-when-testing-with-jest-and-super
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.info(`Listening on port ${PORT}`)
  })
}
export { app, connection }
