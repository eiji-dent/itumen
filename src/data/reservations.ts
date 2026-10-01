import type {MemberId} from './members';
export type Reservation={id:string;spotId:string|null;status:'unknown'|'inquiry'|'booked'|'onsite'|'not_required'|'cancelled';ownerId:MemberId|null;publicNote:string;verifiedAt:string|null};
export const reservations:Reservation[]=[
 {id:'naspa',spotId:'naspa',status:'booked',ownerId:null,publicNote:'10月11日宿泊・夕朝食付き。チェックイン時刻は調整中、12日は10:00までにチェックアウト。',verifiedAt:'2026-10-01'},
 {id:'soba',spotId:'shinbashi',status:'unknown',ownerId:null,publicNote:'しんばしの予約は確認待ち。予約成立と来店時刻は調整中。',verifiedAt:'2026-10-01'},
 {id:'fishing',spotId:'fishing',status:'onsite',ownerId:null,publicNote:'事前予約なし。10:00に現地で釣りとBBQを申し込む予定。受付・空席は当日確認。',verifiedAt:'2026-10-01'},
];
export const reservationById=(id:string|null)=>reservations.find(r=>r.id===id);
export const reservationLabel:Record<Reservation['status'],string>={unknown:'予約状況：調整中',inquiry:'予約状況：問い合わせ中・調整中',booked:'予約済',onsite:'当日現地申込予定',not_required:'予約不要',cancelled:'予約取消'};
