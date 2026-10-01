# 「いつメン越後湯沢旅行 2026」Webしおり 仕様書

- 版：1.0／作成日：2026-09-30
- 対応要件：[requirements.md](requirements.md) v1.0
- 本書は実装の初期設計。旅程の事実・確認状態は要件定義書を正とする。

## 1. 実装構成

React＋TypeScript＋Viteによる静的Webを初期実装案とする。これは本案件の設計選択であり、特定バージョンの最新性を前提としない。着手時に利用可能な安定版とホスティング条件を確認し、依存バージョンをロックする。バックエンド・DBは初期版では不要。HTML/CSSで意味のあるテキストと操作を実装し、イラストは装飾素材として組み込む。

```text
src/
  app/                 # ルーター、共通レイアウト
  pages/               # Home, Itinerary, Members, Base, Info, Packing, NotFound
  components/          # 共通UI
  data/
    trip.ts            # 基本情報、更新情報
    members.ts         # 6人の設定
    events.ts          # DAY1/DAY2の旅程
    spots.ts           # 宿・飲食店・観光地
    reservations.ts    # 公開可能な予約概要のみ
    packing.ts         # 持ち物の定義
  domain/              # 型、入力検証、次の予定の判定
  storage/             # ローカル保存と移行
  styles/              # 色・文字・余白・共通CSS
public/assets/         # オリジナル画像・アイコン
asset-licenses.md      # 素材台帳
```

ビルドで生成した静的ファイルをVercel等に配置する。通常のパス型ルーティングを使い、静的アセット以外のアプリ内ルートをindex.htmlへ返す設定を公開先に置く。未定義パスはアプリで404画面を表示する。初期版にサーバー側の秘密情報を必要とする機能は設けない。

## 2. ルーティングとページ

| URL | ページ・内容 | 主要操作 |
|---|---|---|
| `/` | HOME：タイトル、日付、目的地、集合KV、カウントダウン、次の予定、各ページ入口、最終更新 | DAY選択、次の予定詳細、地図、旅行情報、持ち物 |
| `/itinerary/day1` | 10/11の縦型冒険ルート | DAY2へ、詳細開閉、地図・公式リンク |
| `/itinerary/day2` | 10/12の縦型冒険ルート | DAY1へ、詳細開閉、地図・公式リンク |
| `/members` | 6人の図鑑と比較集合図 | 各キャラの説明展開 |
| `/base` | NASPAニューオータニの拠点情報 | 地図、公式サイト、旅行情報へ |
| `/info` | 交通・食事・スポット・予約概要・買い出し・注意事項 | セクション移動、関連予定へ |
| `/packing` | 分類別持ち物チェック | チェック変更、チェック全解除 |

`/itinerary`へのアクセスは旅行前はDAY1、10/11はDAY1、10/12および終了後はDAY2へ置換遷移する。不正なDAYは404。下部ナビはHOME・旅程・仲間・拠点の4項目で、選択状態を文字と形で示す。旅行情報・持ち物では誤ってHOMEを選択表示しない。

旅程の個別項目は`/itinerary/day1#d1-lunch`等で直接参照できる。ハッシュ対象は初期描画後に詳細を開き、見出しに移動する。sticky見出し分のscroll-marginを設ける。ブラウザの戻る／進むで日付とページを復元し、通常遷移ではページ見出しへフォーカスを移す。

## 3. ページ詳細とコンポーネント

| 部品 | 主な入力 | 描画・動作 |
|---|---|---|
| AppShell | 現在ルート | ヘッダー、main、下部ナビ、共通幅とsafe-area |
| HeroScene | タイトル、日付、キャラ素材 | 山・拠点・6人。文字はHTML、画像失敗時もタイトルと入口を保持 |
| TripStatus | 今日のJST日付 | 出発までN日／DAY1／DAY2／冒険の記録 |
| NextEventCard | 時刻判定の結果 | 状態、時刻、タイトル、仮予定バッジ、詳細と地図 |
| DaySwitcher | dayId | DAY1/DAY2への通常リンク。横スクロール不要 |
| AdventureRoute | 当日のEvent[] | order順のol。道・足跡はaria-hidden |
| EventCard | Event、関連Spot等 | 時刻、題名、概要、状態、詳細、地図。中止は表示するが時刻判定から除外 |
| EventDetails | Event | アコーディオン。予約、担当、交通、メモ。aria-expandedとaria-controlsを設定 |
| MemberCard | Member | キャラ、氏名、役割、説明。顔アイコンだけで情報を伝えない |
| PartyScaleScene | Member[] | 全身高1:1:1:1:4:1の比較絵。ゴーレムの髪を視認可能にする |
| SpotPanel | Spot | 住所・公式・地図・施設メモ。未入力は調整中 |
| ReservationBadge | Reservation | 未確認／問い合わせ中／予約済／予約不要／取消。担当を併記 |
| PackingChecklist | PackingItem[]、保存状態 | 分類、チェック数、各チェック。チェック状態は端末限定 |
| ExternalLink | URL、ラベル | 外部で開く表示。無効URLはリンクにしない |
| UpdateNotice | updatedAt、更新要旨 | 最終更新日時と重要な変更メモ |

HOME表示順は、コンパクトなヘッダー→KV→次の予定→DAY入口→旅行情報／持ち物の近道→仲間・拠点の紹介。390×844を基準にKVは約260px以下から調整し、次の予定を押し下げない。端末の文字拡大時は情報を切らず自然に高さを増やす。

初期版の詳細はインライン展開を使い、画面を覆うモーダルを必須にしない。HOMEの「詳細」は対象旅程のハッシュへ移動し、「地図」は登録済みの同一Spotを直接開く。

## 4. データ構造

TSを推奨し、JSONに移しても同じ構造を維持する。日時はISO 8601の`+09:00`付き、日付は`YYYY-MM-DD`。未入力は`null`、未確定な状態は列挙値で表し、空文字や架空の値で補完しない。

```ts
type MemberId = 'eiji' | 'yuta' | 'yuhei' | 'ryo' | 'takahiro' | 'yoshihito';
type DayId = 'day1' | 'day2';
type PlanStatus = 'confirmed' | 'tentative' | 'pending' | 'cancelled';
type TimePrecision = 'exact' | 'approximate' | 'after' | 'period' | 'unknown';
interface SourceNote {
  source: string;                 // 会話、担当者確認など
  checkedAt: string | null;       // 確認日時。未確認ならnull
  note: string | null;
}
interface Trip {
  id: 'itsumen-yuzawa-2026';
  title: string;
  startDate: '2026-10-11';
  endDate: '2026-10-12';
  timezone: 'Asia/Tokyo';
  baseSpotId: string;
  memberIds: MemberId[];
  updatedAt: string;
  updateSummary: string | null;
  schemaVersion: 1;
}
interface Member {
  id: MemberId;
  name: string;
  role: string;
  description: string;
  character: 'swordsman' | 'golem';
  wearsGlasses: false;
  hasHair: boolean;
  relativeHeight: 1 | 4;
  image: string | null;
  imageAlt: string;
  participation: { day1: true; day2: true; joinsAt: string | null; note: string | null };
  // たかひろのjoinsAtは2026-10-11T18:30:00+09:00。他5人はnull
}
interface Event {
  id: string; dayId: DayId; date: string; order: number;
  timeLabel: string;              // 「12:00ごろ」「午後」「15:00以降」等
  timePrecision: TimePrecision;
  startAt: string | null;        // exact/approximate/afterのみ設定可
  endAt: string | null;
  status: PlanStatus;
  title: string; summary: string;
  details: string[];
  spotId: string | null;
  candidateSpotIds: string[];
  reservationId: string | null;
  participantIds: MemberId[];
  ownerId: MemberId | null;
  icon: 'meeting' | 'meal' | 'ropeway' | 'shopping' | 'hotel' | 'free' | 'fishing' | 'departure';
  travelNote: string | null;
  source: SourceNote;
}
interface Spot {
  id: string; name: string;
  category: 'hotel' | 'restaurant' | 'activity' | 'station' | 'shop' | 'meeting';
  status: PlanStatus;
  address: string | null;
  mapsUrl: string | null;
  officialUrl: string | null;
  phone: string | null;          // 公開施設の電話だけ
  checkInLabel: string | null;
  checkOutLabel: string | null;
  notes: string[];
  source: SourceNote;
}
interface Reservation {
  id: string; spotId: string | null;
  status: 'unknown' | 'inquiry' | 'booked' | 'not_required' | 'cancelled';
  ownerId: MemberId | null;
  timeLabel: string | null;
  headcount: number | null;
  publicNote: string | null;
  verifiedAt: string | null;
  // 予約番号、個人電話、部屋番号、決済情報はこの型に持たせない
}
interface PackingItem {
  id: string;
  category: 'essential' | 'recommended' | 'activity' | 'shared';
  label: string; note: string | null; order: number;
  suggested: boolean;            // 初期提案か、確認済みか
}
```

### 初期登録例

```ts
const fishingEvent: Event = {
  id: 'd2-fishing', dayId: 'day2', date: '2026-10-12', order: 30,
  timeLabel: '10:00ごろ', timePrecision: 'approximate',
  startAt: '2026-10-12T10:00:00+09:00', endAt: null,
  status: 'tentative', title: '湯沢フィッシングパーク', summary: '釣り＆BBQ',
  details: ['時刻・人数・料金・予約成立を確認する'],
  spotId: 'yuzawa-fishing-park', candidateSpotIds: [],
  reservationId: 'res-fishing',
  participantIds: ['eiji', 'yuta', 'yuhei', 'ryo', 'takahiro', 'yoshihito'],
  ownerId: 'takahiro', icon: 'fishing', travelNote: null,
  source: { source: '過去会話の旅程整理', checkedAt: null,
    note: '「たかひろ予約」という記録。成立確認は未取得' }
};
const fishingReservation: Reservation = {
  id: 'res-fishing', spotId: 'yuzawa-fishing-park', status: 'unknown',
  ownerId: 'takahiro', timeLabel: null, headcount: null,
  publicNote: '担当：たかひろ／予約状況は確認中', verifiedAt: null
};
```

旅程の初期行は要件定義書第3章から登録する。DAY1はmeeting/lunch/park/shopping/checkin/free/takahiro-join/dinner/party、DAY2はbreakfast/checkout/fishing/station/departureを安定IDにする。たかひろ集合は`d1-takahiro-join`として、18:30、exact、confirmed、startAt=`2026-10-11T18:30:00+09:00`、endAt=null、spotId=nullで登録する。集合場所は「調整中」とする。DAY1の合流前のparticipantIdsは他の5人、合流後とDAY2は6人とする。集合イベント自体のparticipantIdsはたかひろ、他5人が同席するかは未確認とする。自由行動など合流時刻をまたぐ予定は説明に合流後の参加を記載する。他の初期旅程は原則tentative、追加確認項目はpendingとし、確定は確認後に変更する。

持ち物の初期提案は財布、スマートフォン、充電器、着替え、下着、歯ブラシ、モバイルバッテリー、常備薬、傘、歩きやすい靴。アクティビティ専用品・宿の備品は確認後に追加／整理する。共用品のチェックも個人端末の記録であり、全員共通の準備完了にはしない。

### 入力検証

ビルド前にID重複、参照ID欠損、日付とdayIdの不一致、無効日時、endAt≦startAt、order重複、無効URLを検出する。memberIdsは指定6人、たかひろのみgolemかつrelativeHeight=4、他はswordsmanかつ1とする。period/unknownはstartAt=null。bookedにはverifiedAtを必須にする。本文はテキストとして描画し、データ内HTMLを実行しない。

## 5. 日付・次の予定の判定

端末時計を使用するが、日付境界は常にAsia/Tokyoへ変換する。60秒ごと、およびタブ復帰時に再計算する。位置情報や実際の到着・参加状況は推定しない。たかひろは18:30前は「18:30集合予定」、以後は「18:30集合の予定」と表示できるが、時計だけで「到着済み」に変更しない。図鑑と旅行全体の集合KVには常に6人を掲載し、当日の旅程上の参加予定と区別する。

1. 2026-10-11 00:00 JSTより前は「出撃まであとN日」。JSTの暦日差を使い、残り時間の切上げと混同しない。最初の非中止予定を「最初の予定」として表示。
2. 10/11はDAY1、10/12はDAY2。`confirmed`かつ`exact`で開始・終了両方があり、開始≦現在＜終了なら「予定上の進行中」。同時に複数ある場合はorder順に主表示し「同時刻の予定あり」を添える。
3. 進行中がなければ、その日のstartAtが現在より後のexact/approximateを日時順・order順に選ぶ。approximateやtentativeは必ず「目安」「仮予定」を添える。
4. `after`（15:00以降等）、`period`、`unknown`は自動選択の候補から外す。時刻のある候補より前のorderにこれらが残っていれば、カード名を「次の時刻付き予定」とし「時刻未定の予定あり／旅程で確認」を表示する。
5. exactでも終了未設定のイベントは進行中とは断定しない。開始時刻を過ぎた予定や曖昧な予定を自動で「完了」扱いにしない。
6. 当日の未来時刻候補がなくても「今日の予定を確認」を表示し、当日の旅程へ案内する。DAY1には翌日の入口を添える。曖昧な夕食等を飛ばして旅行終了とはしない。
7. 2026-10-13 00:00 JST以降は「冒険の記録」。旅程は引き続き閲覧可能。

時刻未確定の案が多い初期データでは「今日の予定を確認」等の控えめな案内を許容する。「次の予定」が現地の実際の行動を保証する表現にしない。

## 6. レスポンシブと視覚仕様

- コンテンツ幅は最大720px、左右余白16px（320px時は12px）。背景は画面全体、旅程は全幅帯でも1列を維持する。
- 768px以上はHOME補助情報や図鑑を2列可。図鑑は狭い画面では1列、十分な幅がある場合は2列とし、説明を省略しすぎない。
- 下部ナビは高さ64pxを基準に`env(safe-area-inset-bottom)`を加える。本文下余白も同値＋24px。ナビは4等分、ラベル常時表示。
- 色トークン初期案：空`#9EDFFF`、草`#89C94A`、羊皮紙`#FFF1CB`、木`#8A542D`、輪郭／本文`#2B2118`、赤`#C43D32`。実際の文字と背景の組合せは測定して調整する。
- 見出し24〜32px、本文16px、注記14px以上。見出しの縁取り2px前後、パネルの輪郭3px前後。住所と時刻は通常文字で選択・コピー可能にする。
- 日本語システムフォントを基本とし、追加フォントはライセンス・転送量を確認する。
- 画像は幅・高さを指定。HOMEの主要画像のみ優先読込し、それ以外は遅延読込。WebP/AVIF等と適切な代替を検討する。
- ゴーレム比率は全身素材の描画高で定義する。比較図は剣士60単位に対してゴーレム240単位を基準に全体を同比率で縮小する。カードの見出しや本文を覆わせない。

## 7. アニメーション

初期版で必須なのは操作フィードバックのみ。ボタン押下は100〜150msで軽く縮む、詳細開閉は150〜200ms程度を上限の目安にする。追加する場合、キャラの上下動は振幅2〜4px、周期3〜5秒程度とし、時刻やボタン自体は動かさない。

`prefers-reduced-motion: reduce`で装飾アニメーションとスムーズスクロールを停止する。連続する背景アニメーションを導入する場合は停止スイッチも用意し、画面外では止める。点滅・自動音声・強制ローディング演出は採用しない。音は任意開発で初期OFF、明示操作後のみ再生し、独自または許諾素材を使う。

## 8. 保存・更新

共有コンテンツはTS/JSON→入力検証→ビルド→公開の流れで更新する。編集時にtrip.updatedAtとupdateSummaryを更新し、同じデータをすべての画面から参照する。公開済みビルドは既に開いているタブへ自動反映されるとは限らないため、HOMEに最終更新日時と再読み込みの導線を用意する。

持ち物はlocalStorageキー`itsumen-yuzawa-2026:packing:v1`で保存する。

```json
{
  "schemaVersion": 1,
  "checkedIds": ["wallet", "charger"],
  "updatedAt": "2026-09-30T12:00:00+09:00"
}
```

読込時はJSON例外を捕捉し、存在するitem IDだけ採用する。破損・未知バージョンは空状態で開始し、保存状態を読み込めなかった旨を表示する。追加品は未チェック、削除品は無視。同じブラウザのタブ間ではstorageイベントで更新できる。別端末や別ブラウザへの同期は行わない。

保存失敗時はメモリ上で操作を継続し「この端末に保存できません。閉じるとチェックが消える場合があります」と表示。チェック全解除だけは誤操作防止の確認を挟む。個別のチェック変更には確認を挟まない。ブラウザデータ削除で状態が消えることを画面に短く記載する。

## 9. 外部リンクと公開情報

地図は確認済みのmapsUrlがあれば使用する。URLを生成する場合は、確認済み正式施設名と住所からGoogle Mapsの検索URLを組み立て、クエリをエンコードして現地の正しい地点に一致するか確認する。候補店舗を確定店舗として地図誘導しない。公式サイト・住所は確認できるまでnullとする。

外部リンクはHTTPSを基本に検証し、`target="_blank" rel="noopener noreferrer"`を付ける。開く先が外部であることをアイコンと読み上げ用ラベルで示す。未登録なら「場所は確認中」と表示し、押せるダミーボタンを置かない。施設電話を載せる場合のみ確認済み番号へtelリンクを設ける。

初期版は公開可能な情報だけで構成する。予約番号等は画面で非表示にするだけでなく、配信JSON・JS・画像・ソースマップにも含めない。公開URLを知る人だけに共有する運用やnoindexはアクセス制限とはみなさない。限定情報が必要になった場合は認証を別途設計する。

## 10. PWAの採否と追加時の仕様

初期版では必須にしない。採用時はmanifest、独自アイコン、Service Worker、オフライン表示、更新通知を一組で導入する。ホーム画面への追加方法は端末によって異なるため、必ずインストールできるような断定をしない。

アプリ本体と確認済み旅程を事前キャッシュし、最終取得日時を表示する。ナビゲーションはnetwork-first＋キャッシュへのフォールバック、ハッシュ付き画像等はcache-firstを基本案にする。外部地図・予約サービスはキャッシュ対象外。通信不可時は外部リンクが通信を必要とすることを案内する。

更新されたService Workerは「新しいしおりがあります」で利用者の再読み込みを待ち、チェック操作の途中で強制リロードしない。新旧データを混在させず、キャッシュを版単位で更新する。オンライン復帰、新版反映、初回オフライン、再訪オフラインを実機検証する。初回訪問前のオフライン閲覧は保証しない。

## 11. 実装優先順位

| 段階 | 実装内容 | 完了条件 |
|---|---|---|
| P0-1 | データ型・初期旅程・確認状態・共通レイアウト | 最新の18:30集合を反映し、全ページで共通データを使える |
| P0-2 | HOME、DAY1/DAY2、図鑑、キャラ基本素材 | スマホで世界観・6人の設定・旅程の読みやすさを確認 |
| P0-3 | 拠点、旅行情報、予約概要、地図、持ち物保存 | 必須F01〜F10がすべて利用可能 |
| P0-4 | 時刻境界、アクセシビリティ、性能、公開設定 | 要件定義書A01〜A14を検証し、未確定情報が明示される |
| P1 | サブKV、控えめな演出、QR、必要ならPWA | 必須機能の性能と読みやすさを維持 |
| P2 | 思い出ページ、写真へのリンク、独立マップ | 写真等の共有範囲を決めて追加 |

旅行用の初期公開にはP0-3までの全機能とP0-4の確認を含める。HOMEとDAYだけの試作を完成版とは扱わない。画像はメインKV1点＋集合／比較図を優先し、DAY1・DAY2のサブKVは後から追加できる。全セクションへの大きな画像制作は必須にしない。

## 12. 検証ケースと引継ぎ

- 時刻判定：10/10 23:59、10/11 00:00、確定イベントの開始ちょうど・終了ちょうど、10/11 18:29・18:30（たかひろの集合予定表示）、10/12 00:00、10/13 00:00をJSTで検証。端末表示タイムゾーンを変えても結果が変わらないこと。
- 不完全データ：時刻なし、開始だけ、15:00以降、仮予定、中止、同時刻、地図未入力で虚偽の進行中・予約済を表示しないこと。
- ナビ：直接URL、ハッシュ、戻る／進む、再読み込み、不正URLを確認。
- 保存：チェック後再読み込み、品目追加・削除、保存拒否、壊れたJSON、チェック全解除の取消を確認。
- UI：320/390/430/768/1280px、横向き、文字拡大、画面下safe-area、キーボード、動き軽減で確認。
- コンテンツ：6人の名前・役割・説明、眼鏡なし、たかひろの髪・比率・DAY1の18:30集合、DAY2参加を確認。
- 配信：ビルド成功、全ルート表示、登録済み地図の行先、画像欠損、最終更新、機密情報混入なしを確認。

時刻判定・入力検証・保存障害は意味のある自動テスト対象とする。装飾のわずかな差はスクリーンショットと実機で確認する。公開前の確認結果には端末・ブラウザ版、計測条件、残る未確定情報を記録する。

実装担当へ引き継ぐ成果物は、ソース一式、編集可能なデータ、素材台帳、更新手順、検証記録、公開先の設定。現時点の納品は本仕様書と要件定義書の2文書であり、Web実装・予約確認・公開完了を意味しない。
