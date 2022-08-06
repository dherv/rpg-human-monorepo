import { format } from 'date-fns'
import { Activity, Session } from '../types/types'

export const activitiesMock: Activity[] = [
  { activityId: 1, name: 'skateboard', duration: 1 },
  { activityId: 2, name: 'surf', duration: 2 },
  { activityId: 3, name: 'code', duration: 4 },
]

export const sessionsMock: Session[] = [
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
})

export const characterMock = {
  id: 1,
  name: 'Bob',
  physical: 1,
  mental: 1,
  courage: 1,
  active: 2,
}
