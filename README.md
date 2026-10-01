# いつメン越後湯沢旅行 2026

2026年10月11日〜12日のスマートフォン向けWebしおりです。

公開URL: [https://itumen.vercel.app/](https://itumen.vercel.app/)

## 起動

```sh
npm install
npm run dev
```

表示されたローカルURLを開いてください。本番用ファイルは `npm run build` で `dist/` に生成します。Vercelのパス型ルート用に `vercel.json` を同梱しています。

## 情報の更新

- 基本情報: `src/data/trip.ts`
- 旅程: `src/data/events.ts`
- メンバー: `src/data/members.ts`
- 拠点・スポット: `src/data/spots.ts`
- 予約の公開概要: `src/data/reservations.ts`
- 持ち物: `src/data/packing.ts`

未確認事項を確定に変更する前に、出典と確認日を確認してください。変更時は `trip.updatedAt` と `trip.updateSummary` も更新します。`npm run build` はID、参照、日時、URLなどを検証します。予約番号・個人電話・部屋番号は公開データに追加しないでください。

持ち物チェックは端末の `localStorage` のみで保存します。異なる端末間では同期しません。

## 画像と操作

HOMEと仲間図鑑は参考ポスターを元の比率で表示します。仲間図鑑はスマホの横幅いっぱいに広げ、画面の高さが足りない場合は縦スクロールで全体を見られます。看板や人物の輪郭に合わせた多角形のタップ領域を重ねています。HOMEの看板は押すと沈んで移動します。仲間図鑑の人物はタップすると軽く跳ねるだけで詳細画面は開きません。上部の「もどる」「ホーム」はHOMEへ移動します。タップ領域の位置と形は `src/main.tsx` の `homeHotspots` と `memberHotspots` で画像に対する百分率として管理します。ポスター画像を差し替える場合は、この位置と形も確認してください。

DAY1・DAY2は文字なしの生成風景を背景に、旅程データから作るカードを重ねています。未確定の時刻・予約は画像に焼き込まず、画面上で「調整中」と表示します。素材と生成指示は `asset-licenses.md`、`image-prompts.md` を参照してください。
