export const trip = {
  id: 'itsumen-yuzawa-2026', title: 'いつメン越後湯沢旅行 2026', startDate: '2026-10-11', endDate: '2026-10-12', timezone: 'Asia/Tokyo', baseSpotId: 'naspa', updatedAt: '2026-10-01', updateSummary: 'DAY1夜のスマブラ予定と持ち物にSwitchコントローラーを追加。開始時刻などは調整中です。', schemaVersion: 1,
} as const;
export type DayId = 'day1' | 'day2';
export type PlanStatus = 'confirmed' | 'tentative' | 'pending' | 'cancelled';
export type TimePrecision = 'exact' | 'approximate' | 'after' | 'period' | 'unknown';
export const statusLabel: Record<PlanStatus,string> = {confirmed:'確定',tentative:'仮予定・調整中',pending:'調整中',cancelled:'中止'};
export const dayDate: Record<DayId,string> = {day1:'2026-10-11',day2:'2026-10-12'};
