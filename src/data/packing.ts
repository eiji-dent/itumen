export type PackingItem={id:string;category:'必需品'|'衣類・身支度'|'あると便利';label:string;note:string|null;order:number;suggested:true};
export const packingItems:PackingItem[]=[
 {id:'wallet',category:'必需品',label:'財布',note:null}, {id:'phone',category:'必需品',label:'スマートフォン',note:null}, {id:'charger',category:'必需品',label:'充電器',note:null},
 {id:'clothes',category:'衣類・身支度',label:'着替え',note:null}, {id:'underwear',category:'衣類・身支度',label:'下着',note:null}, {id:'toothbrush',category:'衣類・身支度',label:'歯ブラシ',note:'宿の備品は調整中'},
 {id:'battery',category:'あると便利',label:'モバイルバッテリー',note:null}, {id:'medicine',category:'あると便利',label:'常備薬',note:null}, {id:'umbrella',category:'あると便利',label:'傘',note:null}, {id:'shoes',category:'あると便利',label:'歩きやすい靴',note:null}, {id:'switch-controller',category:'あると便利',label:'Switchコントローラー',note:'部屋でスマブラ用。Switch本体はたかひろが持参'},
].map((x,i)=>({...x,order:i+1,suggested:true})) as PackingItem[];
