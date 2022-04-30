// src/mocks/handlers.js
import { rest } from 'msw';
import { Activity, Session } from '../types/types';

const activitiesMock: Activity[] = [
  { activity_id: 1, name: "skateboard", duration: 1 },
  { activity_id: 2, name: "surf", duration: 2 },
  { activity_id: 3, name: "code", duration: 4 },
];

const sessionsMock: Session[] = [
  { session_id: 1, date: "2022/02/28", activity_id: 1, duration: 1 },
  { session_id: 2, date: "2022/02/30", activity_id: 2, duration: 2 },
  { session_id: 3, date: "2022/02/30", activity_id: 1, duration: 4 },
];

const characterMock = {
  id: 1,
  name: "Bob",
  physical: 1,
  mental: 1,
  courage: 1,
  active: 2,
};

const url = `http://localhost:5000/v1`;
export const handlers = [
  rest.get(`${url}/activities`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(activitiesMock));
  }),

  rest.get(`${url}/activities/:activityId`, (req, res, ctx) => {
    const { activityId } = req.params;
    return res(
      ctx.status(200),
      ctx.json(
        activitiesMock.find(
          (activity) => activity.activity_id === Number(activityId)
        )
      )
    );
  }),

  rest.post(`${url}/activities`, (req, res, ctx) => {
    const { body } = req as any;
    const newActivity = { id: activitiesMock.length + 1, ...body };
    activitiesMock.push(newActivity);
    return res(ctx.status(200), ctx.json(newActivity));
  }),

  rest.get(`${url}/sessions`, (req, res, ctx) => {
    const activityId = req.url.searchParams.get("activityId");
    console.log({ activityId, sessionsMock });
    const sessions = activityId
      ? sessionsMock.filter(
          (session) => session.activity_id === Number(activityId)
        )
      : sessionsMock.map((session) => {
          return {
            ...session,
            activity: activitiesMock.find(
              (activity) => activity.activity_id === session.activity_id
            ),
          };
        });
    return res(ctx.status(200), ctx.json(sessions));
  }),

  rest.post(`${url}/sessions`, (req, res, ctx) => {
    const { body } = req as any;
    const newSession = { id: sessionsMock.length + 1, ...body };
    sessionsMock.push(newSession);
    return res(ctx.status(200), ctx.json(newSession));
  }),

  rest.get(`${url}/character`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(characterMock));
  }),
];
