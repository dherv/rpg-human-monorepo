// src/mocks/handlers.js
import { rest } from 'msw';
import { Activity, Session } from '../types/types';

const activitiesMock: Activity[] = [
  { id: 1, name: "skateboard", duration: 1 },
  { id: 2, name: "surf", duration: 2 },
  { id: 3, name: "code", duration: 4 },
];

const sessionsMock: Session[] = [
  { id: 1, date: "2022/02/28", activityId: 1, duration: 1 },
  { id: 2, date: "2022/02/29", activityId: 2, duration: 2 },
  { id: 3, date: "2022/01/30", activityId: 1, duration: 4 },
];

const characterMock = {
  id: 1,
  name: "Bob",
  physical: 1,
  mental: 1,
  courage: 1,
  active: 2,
};

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

  rest.get("/api/sessions", (req, res, ctx) => {
    const activityId = req.url.searchParams.get("activityId");
    const sessions = sessionsMock.filter(
      (session) => session.activityId === Number(activityId)
    );
    return res(ctx.status(200), ctx.json(sessions));
  }),

  rest.post("/api/sessions", (req, res, ctx) => {
    const { body } = req as any;
    const newSession = { id: sessionsMock.length + 1, ...body };
    sessionsMock.push(newSession);
    return res(ctx.status(200), ctx.json(newSession));
  }),

  rest.get("/api/character", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(characterMock));
  }),
];
