export interface GameState {
  id: string;
  coins: number;
  house_status: HouseStatus;
  roberto_mood: Mood;
  alejandra_mood: Mood;
  rita_happiness: number;
  rita_hunger: number;
  valky_happiness: number;
  valky_hunger: number;
  penny_happiness: number;
  penny_hunger: number;
  last_updated: string;
}

export type HouseStatus = 'Impecable' | 'Limpia' | 'Necesita atención' | 'Caótica';
export type Mood = 'happy' | 'tired' | 'energized' | 'stressed';
export type ScheduleType = 'normal' | 'hyrox' | 'homeoffice' | 'weekend';

export interface PresetTask {
  id: string;
  name: string;
  coins: number;
  category: 'express' | 'routine' | 'deep';
  schedules: ScheduleType[];
  icon: string;
}

export interface TaskCompletion {
  id: string;
  task_id: string;
  task_name: string;
  coins_earned: number;
  completed_by: string;
  completed_at: string;
}

export interface FurnitureItem {
  id: string;
  name: string;
  nameEs: string;
  cost: number;
  icon: string;
  description: string;
}

export type Person = 'roberto' | 'alejandra';
