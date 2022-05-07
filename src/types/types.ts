export interface Activity {
  activity_id: number;
  name: string;
  duration: number;
}

export interface Session {
  session_id: number;
  duration: number;
  date: string;
  activity_id: number;
  note?: string;
  improvement?: string;
  proud?: string;
  newSkill?: string;
  activity?: Activity;
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
  character_id: number;
  name: string;
}
