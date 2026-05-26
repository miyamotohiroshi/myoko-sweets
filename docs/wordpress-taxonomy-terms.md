# タクソノミー ターム登録手順書

CPT UI・ACFのインポート後、以下のタームを手動で登録してください。
（CPT UIのインポートJSONにはタームが含まれないため、手動入力が必要です）

---

## 登録方法

WordPress管理画面 → 各タクソノミー名（左メニューに表示される）→ 新規追加

---

## ① shop_type（店舗種別）

対象：店舗情報 → 店舗種別

| 名前 | スラッグ |
|---|---|
| スイーツ店 | sweets |
| カフェ | cafe |
| レストラン | restaurant |
| お土産屋 | souvenir |

---

## ② sweets_category（スイーツ種類）

対象：店舗情報 → スイーツ種類

| 名前 | スラッグ |
|---|---|
| ケーキ | cake |
| クレープ | crepe |
| アイス | ice |
| プリン | pudding |
| パフェ | parfait |
| ジェラート | gelato |
| クッキー | cookie |
| 和菓子 | wagashi |
| 地元食材スイーツ | local |
| シュークリーム | cream_puff |
| かき氷 | kakigori |
| パンケーキ | pancake |

---

## ③ drink_category（ドリンク種類）

対象：店舗情報 → ドリンク種類

| 名前 | スラッグ |
|---|---|
| コーヒー | coffee |
| 紅茶 | tea |
| 緑茶 | green_tea |
| ビール | beer |
| カクテル | cocktail |
| ワイン白 | wine_white |
| ワイン赤 | wine_red |

---

## ④ area（エリア）

対象：店舗情報 → エリア　／　観光スポット → エリア

| 名前 | スラッグ |
|---|---|
| 妙高高原 | myoko |
| 野尻湖 | nojiriko |
| 新井・中郷 | arai |
| その他 | other |

---

## ⑤ features（特徴）

対象：店舗情報 → 特徴

| 名前 | スラッグ |
|---|---|
| 席あり | has_seat |
| 持ち帰りあり | takeout |
| 持ち帰りのみ | takeout_only |
| 食事あり | has_food |
| Wi-Fiあり | has_wifi |
| 電源あり | has_power |

---

## ⑥ spot_category（スポットカテゴリ）

対象：観光スポット → スポットカテゴリ

| 名前 | スラッグ |
|---|---|
| 神社・寺 | shrine |
| 温泉 | onsen |
| 自然・景勝地 | nature |
| スキー場 | ski |
| 体験・アクティビティ | activity |
| ショッピング | shopping |
| その他 | other |

---

## 注意

- スラッグはアルファベット・アンダースコアのみで入力してください
- 階層型タクソノミー（shop_type・area・spot_category）は親子関係は不要です（フラット構造で登録）
