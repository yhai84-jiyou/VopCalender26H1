
import { DayType } from './types';

export const WEEKDAYS = ['一', '二', '三', '四', '五', '六', '日'];

export const COLORS: Record<string, string> = {
  PRE: 'bg-gray-400',
  S1: 'bg-emerald-500',
  S2: 'bg-sky-500',
  S3: 'bg-indigo-500',
  S4: 'bg-orange-400',
  S5: 'bg-rose-500',
  S6: 'bg-purple-500',
  S7: 'bg-teal-500',
  S8: 'bg-blue-500',
  S9: 'bg-violet-500',
  S10: 'bg-amber-500',
  S11: 'bg-pink-500',
  S12: 'bg-cyan-500',
  S13: 'bg-lime-500',
};

const HOLIDAYS_2026 = [
  "2026-01-01", 
  "2026-02-16", "2026-02-17", "2026-02-18", "2026-02-19", "2026-02-20", "2026-02-21", "2026-02-22",
  "2026-04-04", "2026-04-05", "2026-04-06",
  "2026-05-01", "2026-05-02", "2026-05-03", "2026-05-04", "2026-05-05",
  "2026-06-19", "2026-06-20", "2026-06-21"
];

export const isHoliday = (y: number, m: number, d: number) => {
  const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
  return HOLIDAYS_2026.includes(dateStr);
};
