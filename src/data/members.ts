export type MemberId = 'eiji'|'yuta'|'yuhei'|'ryo'|'takahiro'|'yoshihito';
export type Member = {id:MemberId;name:string;role:string;description:string;character:'swordsman'|'golem';relativeHeight:1|4;hasHair:boolean;wearsGlasses:false;joinsAt:string|null;color:string};
export const members: Member[] = [
 {id:'eiji',name:'えいじ',role:'しおり係',description:'旅の情報をまとめて、みんなを案内するしおり係。',color:'#eec454'},
 {id:'yuta',name:'ゆうた',role:'予約会計係',description:'予約と会計を取りまとめる、旅の管理役。',color:'#88b8d1'},
 {id:'yuhei',name:'ゆうへい',role:'交通係',description:'集合から帰路まで、移動の段取りを確認する交通係。',color:'#ef997e'},
 {id:'ryo',name:'りょう',role:'エンタメ係',description:'遊びと楽しい時間を考えるエンタメ係。',color:'#ae9acd'},
 {id:'takahiro',name:'たかひろ',role:'分院長原始人',description:'分院長原始人。DAY1の18:30に集合して、みんなと冒険へ。',color:'#b58b62',joinsAt:'2026-10-11T18:30:00+09:00'},
 {id:'yoshihito',name:'よしひと',role:'スケジュール係',description:'予定と時間配分を確認し、旅の進行を支える係。',color:'#7dbb8d'},
].map(m=>({character:m.id==='takahiro'?'golem':'swordsman',relativeHeight:m.id==='takahiro'?4:1,hasHair:m.id==='takahiro',wearsGlasses:false,joinsAt:null,...m})) as Member[];
export const memberName = (id:MemberId|null) => members.find(m=>m.id===id)?.name ?? '調整中';
export const fiveMembers = members.filter(m=>m.id!=='takahiro').map(m=>m.id);
export const allMembers = members.map(m=>m.id);
