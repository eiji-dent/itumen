import type {PlanStatus} from './trip';
export type Spot = {id:string;name:string;category:'hotel'|'restaurant'|'activity'|'station'|'shop';status:PlanStatus;address:string|null;mapsUrl:string|null;officialUrl:string|null;notes:string[];checkInLabel?:string|null;checkOutLabel?:string|null;planLabel?:string|null;source:string};
export const spots:Spot[] = [
 {id:'naspa',name:'NASPAニューオータニ',category:'hotel',status:'confirmed',address:'〒949-6101 新潟県南魚沼郡湯沢町湯沢2117-9',mapsUrl:'https://www.google.com/maps/search/?api=1&query=NASPA%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%AA%E3%83%BC%E3%82%BF%E3%83%8B%20%E6%96%B0%E6%BD%9F%E7%9C%8C%E5%8D%97%E9%AD%9A%E6%B2%BC%E9%83%A1%E6%B9%AF%E6%B2%A2%E7%94%BA%E6%B9%AF%E6%B2%A22117-9',officialUrl:'https://www.naspa.co.jp/access/',checkInLabel:'10月11日（時刻調整中）',checkOutLabel:'10月12日 10:00まで',planLabel:'夕朝食付き（夕食・朝食ビュッフェ）',notes:['宿泊予約済み。チェックイン時刻と利用人数は予約画面では確認できません。','予約画面では10月8日までキャンセル料無料と表示。変更前に最新の条件を確認してください。'],source:'利用者提供の一休.com予約画面（2026-10-01確認）／住所はNASPA公式アクセス（2026-09-30確認）'},
 {id:'ropeway',name:'ロープウェー・パノラマパーク',category:'activity',status:'tentative',address:null,mapsUrl:null,officialUrl:null,notes:['正式施設名・営業・利用条件は調整中。','トレッキング・ボブスレー・ゴーカートは候補。'],source:'過去会話の旅程案'},
 {id:'ponshukan',name:'ぽんしゅ館など',category:'shop',status:'tentative',address:null,mapsUrl:null,officialUrl:null,notes:['買い出し候補。分担と品目は調整中。'],source:'過去会話の旅程案'},
 {id:'fishing',name:'湯沢フィッシングパーク',category:'activity',status:'tentative',address:null,mapsUrl:null,officialUrl:null,notes:['釣り＆BBQを検討中。営業・料金・予約成立は調整中。'],source:'過去会話の旅程案'},
 {id:'station',name:'越後湯沢駅など',category:'station',status:'tentative',address:null,mapsUrl:null,officialUrl:null,notes:['散策・解散場所は調整中。'],source:'過去会話の旅程案'},
];
export const spotById=(id:string|null)=>spots.find(s=>s.id===id);
