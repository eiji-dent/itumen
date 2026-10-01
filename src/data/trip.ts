export const trip = {
  id: 'itsumen-yuzawa-2026', title: 'いつメン越後湯沢旅行 2026', startDate: '2026-10-11', endDate: '2026-10-12', timezone: 'Asia/Tokyo', baseSpotId: 'naspa', updatedAt: '2026-10-01', updateSummary: 'DAY1は駅に12:30集合、たかひろは18:30にホテル集合。DAY2は9:30ごろホテルを出発予定。', schemaVersion: 1,
} as const;
export type DayId = 'day1' | 'day2';
export type PlanStatus = 'confirmed' | 'tentative' | 'pending' | 'cancelled';
export type TimePrecision = 'exact' | 'approximate' | 'after' | 'period' | 'unknown';
export const statusLabel: Record<PlanStatus,string> = {confirmed:'確定',tentative:'仮予定・調整中',pending:'調整中',cancelled:'中止'};
export const dayDate: Record<DayId,string> = {day1:'2026-10-11',day2:'2026-10-12'};
