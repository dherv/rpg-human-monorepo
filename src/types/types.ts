export interface Activity {
  id: number;
  name: string;
  duration: number;
}

export interface Session {
  id: number;
  duration: number;
  date: string;
  activityId: number;
}
