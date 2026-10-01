import type {MemberId} from './members';
export type Reservation={id:string;spotId:string|null;status:'unknown'|'inquiry'|'booked'|'not_required'|'cancelled';ownerId:MemberId|null;publicNote:string;verifiedAt:string|null};
export const reservations:Reservation[]=[
 {id:'naspa',spotId:'naspa',status:'booked',ownerId:null,publicNote:'10月11日宿泊・夕朝食付き。チェックイン時刻は調整中、12日は10:00までにチェックアウト。',verifiedAt:'2026-10-01'},
 {id:'soba',spotId:null,status:'inquiry',ownerId:null,publicNote:'「筒井リクエスト・予約中」は過去メモ。予約成立は調整中。',verifiedAt:null},
 {id:'fishing',spotId:'fishing',status:'unknown',ownerId:'takahiro',publicNote:'過去メモに「たかひろ予約」。予約成立・人数・料金は調整中。',verifiedAt:null},
];
export const reservationById=(id:string|null)=>reservations.find(r=>r.id===id);
export const reservationLabel:Record<Reservation['status'],string>={unknown:'予約状況：調整中',inquiry:'予約状況：問い合わせ中・調整中',booked:'予約済',not_required:'予約不要',cancelled:'予約取消'};
