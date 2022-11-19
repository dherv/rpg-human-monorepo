// src/mocks/handlers.js
import { rest } from 'msw'
import { Activity, Session } from '../types/types'
import { activitiesMock, characterMock, sessionsMock } from './mocks'

const url = 'http://localhost:5000/v1'
export const handlers = [
  rest.get(`${url}/activities`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(activitiesMock))
  }),

  rest.get(`${url}/activities/:activityId`, (req, res, ctx) => {
    const { activityId } = req.params
    return res(
      ctx.status(200),
      ctx.json(activitiesMock.find((activity) => activity.activityId === Number(activityId))),
    )
  }),

  rest.post(`${url}/activities`, (req, res, ctx) => {
    const { body } = req
    const newActivity = { id: activitiesMock.length + 1, ...(body as Activity) } as Activity
    activitiesMock.push(newActivity)
    return res(ctx.status(200), ctx.json(newActivity))
  }),

  rest.get(`${url}/sessions`, (req, res, ctx) => {
    const activity = req.url.searchParams.get('activity')
    const month = req.url.searchParams.get('month')
    const year = req.url.searchParams.get('year')

    const sessions = sessionsMock.filter((session) => {
      const activityFilter = !activity || session.activityId === Number(activity),
        monthFilter = !month || new Date(session.date).getMonth() + 1 === Number(month),
        yearFilter = !year || new Date(session.date).getFullYear() === Number(year)

      return activityFilter && monthFilter && yearFilter
    })
    return res(ctx.status(200), ctx.json(sessions))
  }),

  rest.post(`${url}/sessions`, (req, res, ctx) => {
    const body = req.body as Omit<Session, 'sessionId'>
    const newSession = {
      sessionId: sessionsMock.length + 1,
      ...body,
      activity: activitiesMock.find((activity) => activity.activityId === body.activityId),
    } as Session
    sessionsMock.push(newSession)
    return res(ctx.status(200), ctx.json(newSession))
  }),

  rest.get(`${url}/character`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(characterMock))
  }),
]
