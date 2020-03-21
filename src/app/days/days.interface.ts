export interface RawDays {
  dagar: RawDay[];
}

export type SwedishBoolean = 'Ja' | 'Nej';

export const swedishBooleanToBoolean = (input: SwedishBoolean) =>
  input === 'Ja';

export interface RawDay {
  datum: string;
  veckodag: string;
  vecka: string;
  ['arbetsfri dag']: SwedishBoolean;
  ['röd dag']: SwedishBoolean;
  ['dag före arbetsfri helgdag']: SwedishBoolean;
  helgdag?: string;
  helgdagsafton?: string;
  ['dag i vecka']: string;
  namnsdag: string[];
  flaggdag: string;
}

export interface Day {
  date: Date;
  weekday: string;
  week: number;
  dayOfWeek: number;
  nonWorkingDay: boolean;
  redDay: boolean;
  holiday?: string;
  halfDay?: string;
  nameDay: string[];
  flagDay?: string;
}
