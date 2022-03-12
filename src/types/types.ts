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
  note?: string;
  improvement?: string;
  proud?: string;
}

// TODO: remove if not used in future
interface NegativeTraits {
  fear: number;
  inactive: number;
}

interface PositiveTraits {
  courage: number;
  active: number;
}

interface Traits extends PositiveTraits {
  physical: number;
  mental: number;
}
export interface Character extends Traits {
  id: number;
  name: string;
}
