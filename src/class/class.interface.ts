import { DayOfWeek } from 'src/entities';

export interface NewClassPayload {
  end: string;
  start: string;
  capacity: number;
  weekDay: DayOfWeek;
}
