// src/mocks/handlers.js
import { rest } from 'msw';
import { activitiesMock, characterMock, sessionsMock } from './mocks';

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
    const activity = req.url.searchParams.get("activity");
    const month = req.url.searchParams.get("month");
    const year = req.url.searchParams.get("year");

    let sessions = sessionsMock.filter((session) => {
      let activityFilter =
          !activity || session.activity_id === Number(activity),
        monthFilter =
          !month || new Date(session.date).getMonth() === Number(month),
        yearFilter =
          !year || new Date(session.date).getFullYear() === Number(year);

      return activityFilter && monthFilter && yearFilter;
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
