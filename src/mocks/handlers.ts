// src/mocks/handlers.js
import { rest } from 'msw';
import { Activity } from '../types/types';

const activitiesMock: Activity[] = [
  { id: 1, name: "skateboard" },
  { id: 2, name: "surf" },
  { id: 3, name: "code" },
];

export const handlers = [
  rest.get("/api/activities", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(activitiesMock));
  }),
];
