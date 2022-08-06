import { format } from 'date-fns'
import { Activity, Session } from '../types/types'

export const activitiesMock: Activity[] = [
  { activityId: 1, name: 'skateboard', duration: 1, color: '#14b8a6' },
  { activityId: 2, name: 'surf', duration: 2, color: '#0ea5e9' },
  { activityId: 3, name: 'code', duration: 4, color: '#ec4899' },
]

export const sessionsMock = [
  {
    sessionId: 1,
    date: format(new Date(), 'yyyy/MM/dd'),
    activityId: 1,
    duration: 1,
  },
  { sessionId: 2, date: '2022/02/30', activityId: 2, duration: 2 },
  { sessionId: 3, date: '2022/02/30', activityId: 1, duration: 4 },
  {
    sessionId: 4,
    date: format(new Date(), 'yyyy/MM/dd'),
    activityId: 2,
    duration: 2,
    note: 'good session',
    improvement: 'take off',
    proud: 'finally took off',
    newSkill: undefined,
  },
].map((session) => {
  return {
    ...session,
    activity: activitiesMock.find((activity) => session.activityId === activity.activityId),
  }
}) as Session[]

export const characterMock = {
  id: 1,
  name: 'Bob',
  physical: 1,
  mental: 1,
  courage: 1,
  active: 2,
}
