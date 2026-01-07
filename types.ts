
export enum DayType {
  NORMAL = 'NORMAL',
  HOLIDAY = 'HOLIDAY',
  WEEKEND = 'WEEKEND',
  MILESTONE_BRD = 'BRD',
  MILESTONE_RPD = 'RPD'
}

export interface CalendarDay {
  day: number;
  month: number;
  year: number;
  type: DayType;
  isCurrentMonth: boolean;
  weekNum: number;
}
