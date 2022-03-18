/**
 * Required External Modules
 */

import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mysql from 'mysql2';
import { charactersRouter } from './characters/characters.router';

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

const connection = mysql
  .createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  })
  .promise();

// API
app.use("/v1/characters", charactersRouter(connection));
// app.use("/v1/activities", activitiesRouter);
// app.use("/v1/sessions", sessionsRouter);

/**
 * Server Activation
 */

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

export { app, server, connection };
