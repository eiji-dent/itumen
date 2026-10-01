import type {PlanStatus} from './trip';
export type Spot = {id:string;name:string;category:'hotel'|'restaurant'|'activity'|'station'|'shop';status:PlanStatus;address:string|null;mapsUrl:string|null;officialUrl:string|null;notes:string[];checkInLabel?:string|null;checkOutLabel?:string|null;source:string};
export const spots:Spot[] = [
 {id:'naspa',name:'NASPAニューオータニ',category:'hotel',status:'confirmed',address:'〒949-6101 新潟県南魚沼郡湯沢町湯沢2117-9',mapsUrl:'https://www.google.com/maps/search/?api=1&query=NASPA%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%AA%E3%83%BC%E3%82%BF%E3%83%8B%20%E6%96%B0%E6%BD%9F%E7%9C%8C%E5%8D%97%E9%AD%9A%E6%B2%BC%E9%83%A1%E6%B9%AF%E6%B2%A2%E7%94%BA%E6%B9%AF%E6%B2%A22117-9',officialUrl:'https://www.naspa.co.jp/access/',checkInLabel:'15:00以降（仮）',checkOutLabel:null,notes:['宿泊プラン・到着時刻・チェックアウト時刻は調整中。','住所は施設公式サイトで確認済み。宿泊予約の成立は別途確認が必要です。'],source:'要件定義書・利用者指定／NASPA公式アクセス（2026-09-30確認）'},
 {id:'ropeway',name:'ロープウェー・パノラマパーク',category:'activity',status:'tentative',address:null,mapsUrl:null,officialUrl:null,notes:['正式施設名・営業・利用条件は調整中。','トレッキング・ボブスレー・ゴーカートは候補。'],source:'過去会話の旅程案'},
 {id:'ponshukan',name:'ぽんしゅ館など',category:'shop',status:'tentative',address:null,mapsUrl:null,officialUrl:null,notes:['買い出し候補。分担と品目は調整中。'],source:'過去会話の旅程案'},
 {id:'fishing',name:'湯沢フィッシングパーク',category:'activity',status:'tentative',address:null,mapsUrl:null,officialUrl:null,notes:['釣り＆BBQを検討中。営業・料金・予約成立は調整中。'],source:'過去会話の旅程案'},
 {id:'station',name:'越後湯沢駅など',category:'station',status:'tentative',address:null,mapsUrl:null,officialUrl:null,notes:['散策・解散場所は調整中。'],source:'過去会話の旅程案'},
];
export const spotById=(id:string|null)=>spots.find(s=>s.id===id);
