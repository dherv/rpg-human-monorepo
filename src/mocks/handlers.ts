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

  rest.get("/api/activities/:activityId", (req, res, ctx) => {
    const { activityId } = req.params;
    return res(
      ctx.status(200),
      ctx.json(
        activitiesMock.find((activity) => activity.id === Number(activityId))
      )
    );
  }),

  rest.post("/api/activities", (req, res, ctx) => {
    const { body } = req as any;
    const newActivity = { id: activitiesMock.length + 1, ...body };
    activitiesMock.push(newActivity);
    return res(ctx.status(200), ctx.json(newActivity));
  }),
];
