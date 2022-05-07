import { format } from 'date-fns';
import { Activity, Session } from '../types/types';

export const activitiesMock: Activity[] = [
  { activity_id: 1, name: "skateboard", duration: 1 },
  { activity_id: 2, name: "surf", duration: 2 },
  { activity_id: 3, name: "code", duration: 4 },
];

export const sessionsMock: Session[] = [
  {
    session_id: 1,
    date: format(new Date(), "yyyy/MM/dd"),
    activity_id: 1,
    duration: 1,
  },
  { session_id: 2, date: "2022/02/30", activity_id: 2, duration: 2 },
  { session_id: 3, date: "2022/02/30", activity_id: 1, duration: 4 },
  {
    session_id: 4,
    date: format(new Date(), "yyyy/MM/dd"),
    activity_id: 2,
    duration: 2,
    note: "good session",
    improvement: "take off",
    proud: "finally took off",
    newSkill: undefined,
  },
].map((session) => {
  return {
    ...session,
    activity: activitiesMock.find(
      (activity) => session.activity_id === activity.activity_id
    ),
  };
});

export const characterMock = {
  id: 1,
  name: "Bob",
  physical: 1,
  mental: 1,
  courage: 1,
  active: 2,
};
