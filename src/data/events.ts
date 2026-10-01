import type {DayId,PlanStatus,TimePrecision} from './trip';
import type {MemberId} from './members';
import {fiveMembers,allMembers} from './members';
export type Event={id:string;dayId:DayId;date:string;order:number;timeLabel:string;timePrecision:TimePrecision;startAt:string|null;endAt:string|null;status:PlanStatus;title:string;summary:string;details:string[];spotId:string|null;candidateSpotIds:string[];reservationId:string|null;participantIds:MemberId[];ownerId:MemberId|null;icon:string;travelNote:string|null;source:{source:string;checkedAt:string|null;note:string|null}};
const baseSource={source:'要件定義書に採用された過去会話の旅程案',checkedAt:null,note:'時刻・施設・予約状況は未確認'};
function make(dayId:DayId,order:number,id:string,title:string,timeLabel:string,summary:string,changes:Partial<Event>={}):Event{return {id,dayId,date:dayId==='day1'?'2026-10-11':'2026-10-12',order,timeLabel,timePrecision:'period',startAt:null,endAt:null,status:'tentative',title,summary,details:[],spotId:null,candidateSpotIds:[],reservationId:null,participantIds:dayId==='day1'?fiveMembers:allMembers,ownerId:null,icon:'flag',travelNote:null,source:baseSource,...changes};}
export const events:Event[]=[
 make('day1',10,'d1-meeting','5人の集合','12:00ごろ（仮）','集合場所・正式時刻・交通手段は調整中。',{timePrecision:'approximate',startAt:'2026-10-11T12:00:00+09:00',details:['たかひろはこの集合には含めず、18:30に合流予定。'],icon:'meeting'}),
 make('day1',20,'d1-lunch','へぎそば','昼','お店と予約は調整中。',{details:['候補：なかのや？／しんばし？。正式店名は未確認。'],reservationId:'soba',icon:'meal'}),
 make('day1',30,'d1-park','ロープウェー・パノラマパーク','午後','景色とアクティビティの候補。',{spotId:'ropeway',details:['正式施設名、移動時間、利用可否は調整中。','トレッキング・ボブスレー・ゴーカートは候補。ジップラインは過去メモでは予約なし。'],icon:'mountain'}),
 make('day1',40,'d1-shopping','買い出し','午後','ぽんしゅ館などを候補に準備。',{spotId:'ponshukan',details:['有志の持ち寄り・買い出し分担は調整中。'],icon:'shopping'}),
 make('day1',50,'d1-checkin','拠点へチェックイン','時刻調整中','NASPAニューオータニは宿泊予約済み。到着時刻は調整中。',{status:'confirmed',timePrecision:'unknown',spotId:'naspa',reservationId:'naspa',details:['10月11日チェックイン。予約画面にチェックイン時刻の指定はありません。','宿泊プランは夕朝食付きです。'],source:{source:'利用者提供の一休.com予約画面',checkedAt:'2026-10-01',note:'予約済み。チェックイン時刻は未定'},icon:'hotel'}),
 make('day1',60,'d1-free','自由行動','夕方','温泉・テニス・ラジコンなどの候補。',{details:['設備・利用条件は調整中。','18:30にたかひろが合流予定。'],icon:'sparkle'}),
 make('day1',70,'d1-takahiro-join','たかひろ集合','18:30','たかひろが合流予定。集合場所は調整中。',{status:'confirmed',timePrecision:'exact',startAt:'2026-10-11T18:30:00+09:00',participantIds:['takahiro'],details:['確認済みなのは集合時刻です。時計だけでは到着済みと判定しません。'],source:{source:'2026-09-30の利用者指定',checkedAt:'2026-09-30',note:'DAY1の18:30集合'},icon:'meeting'}),
 make('day1',80,'d1-dinner','夜ご飯','夜','宿泊プランに夕食ビュッフェ付き。利用時刻は調整中。',{status:'confirmed',participantIds:allMembers,spotId:'naspa',details:['予約画面にローストビーフ・握り寿司ディナービュッフェと記載。','利用時刻と参加人数は調整中。'],source:{source:'利用者提供の一休.com予約画面',checkedAt:'2026-10-01',note:'夕食付きプラン'},icon:'meal'}),
 make('day1',90,'d1-party','部屋飲み','夜','6人で過ごす夜の予定。',{status:'pending',participantIds:allMembers,details:['部屋・持ち寄り・開始時刻は調整中。'],icon:'sparkle'}),
 make('day2',10,'d2-breakfast','朝ごはん','朝','宿泊プランに朝食ビュッフェ付き。利用時刻は調整中。',{status:'confirmed',spotId:'naspa',details:['朝食の場所と利用時刻は調整中。'],source:{source:'利用者提供の一休.com予約画面',checkedAt:'2026-10-01',note:'朝食付きプラン'},icon:'meal'}),
 make('day2',20,'d2-checkout','チェックアウト','10:00まで','NASPAをチェックアウト。釣りへの移動順序は調整中。',{status:'confirmed',timePrecision:'period',spotId:'naspa',reservationId:'naspa',details:['予約画面ではチェックアウトが10:00までと表示。実際の出発時刻は調整中。'],source:{source:'利用者提供の一休.com予約画面',checkedAt:'2026-10-01',note:'10:00までにチェックアウト'},icon:'hotel'}),
 make('day2',30,'d2-fishing','湯沢フィッシングパーク','10:00ごろ（仮）','釣り＆BBQを検討中。',{timePrecision:'approximate',startAt:'2026-10-12T10:00:00+09:00',spotId:'fishing',reservationId:'fishing',ownerId:'takahiro',details:['予約成立・人数・時間・料金は調整中。'],icon:'fish'}),
 make('day2',40,'d2-station','越後湯沢駅など散策','午後（仮）','駅周辺の散策を検討中。',{spotId:'station',details:['実施の有無は調整中。'],icon:'shopping'}),
 make('day2',50,'d2-departure','解散','午後（仮）','集合場所・時刻・帰路は調整中。',{status:'pending',spotId:'station',icon:'flag'}),
];
export const dayEvents=(day:DayId)=>events.filter(e=>e.dayId===day).sort((a,b)=>a.order-b.order);
