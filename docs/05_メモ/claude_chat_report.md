# Claude Chat 引き継ぎレポート

## 作業日時
2026年05月25日

## 今回完了したタスク
- WordPress 用インポートファイルの作成
  - CPT UI インポートJSON（投稿タイプ3種・タクソノミー6種）
  - ACF フィールドグループ インポートJSON（shop用・spot用）
  - タクソノミー ターム登録手順書（ターム一覧）
- REST API の現在の状態を確認（カスタム投稿タイプは未登録と確認）
- タスク管理ファイル「店舗カテゴリ設計」を 🟡 進行中 に更新

## 作成・変更したファイル

| ファイルパス | 変更内容 |
|---|---|
| docs/wordpress-cptui-import.json | CPT UI インポート用JSON（投稿タイプ3種 + タクソノミー6種）新規作成 |
| docs/wordpress-acf-import.json | ACF フィールドグループ インポート用JSON（shop・spot）新規作成 |
| docs/wordpress-taxonomy-terms.md | タクソノミー ターム登録手順書 新規作成 |
| docs/01_タスク管理/02_WEBサイト.md | 店舗カテゴリ設計のステータスを 🟡 進行中 に更新 |

## タスク管理の更新内容

| ファイル | タスク名 | 変更前 | 変更後 |
|---|---|---|---|
| 02_WEBサイト.md | 店舗カテゴリ設計 | 🔴 未着手 | 🟡 進行中 |

## Claude Chatへの申し送り事項

### WordPress管理画面で残っている手動作業（優先順）

1. **CPT UI インポート**（作業1・作業2）
   - WordPress管理画面 → CPT UI → ツール → インポート
   - `docs/wordpress-cptui-import.json` をアップロードして「インポート」
   - 投稿タイプ3種・タクソノミー6種が一括登録される

2. **ACF フィールドグループ インポート**（作業3）
   - WordPress管理画面 → カスタムフィールド → ツール → フィールドグループをインポート
   - `docs/wordpress-acf-import.json` をアップロードして「インポート」
   - shop・spotのフィールドグループが一括登録される

3. **タクソノミー ターム登録**（各タクソノミーに手動入力が必要）
   - `docs/wordpress-taxonomy-terms.md` を参照して各タームを登録
   - 6タクソノミー × 合計47ターム

4. **Google Maps APIキー設定**（作業4）
   - WordPress管理画面 → カスタムフィールド → ツール → Google Maps
   - Google Cloud Console で Maps JavaScript API を有効化してAPIキーを取得・入力

5. **REST API 動作確認**（作業5）
   - インポート後に以下のURLにアクセスしてJSONが返ることを確認：
     - https://cms.myoko-sweets.com/wp-json/wp/v2/shop
     - https://cms.myoko-sweets.com/wp-json/wp/v2/feature
     - https://cms.myoko-sweets.com/wp-json/wp/v2/spot

## 次のステップ提案
1. 上記5つの手動作業を完了する
2. テスト用に店舗情報を1件入力して、フィールドが正しく表示されるか確認
3. REST APIで `?acf_format=standard` パラメータを付けてACFフィールドが返ってくるか確認
4. Vercel の Root Directory を `web` に変更（前回未完了）
5. Next.js 側の `src/lib/wordpress.ts` を今回設計した投稿タイプ・フィールドに合わせて更新

## 気になった点・懸念点
- ACFのGoogle Mapフィールドは Maps JavaScript API キーが必須。取得・設定が必要。
- ACFのREST API連携（`show_in_rest`）はデフォルトで無効。Next.jsから `acf` フィールドを取得するには、ACF PRO か `acf-to-rest-api` プラグインが必要な場合がある。
- タクソノミーターム（47件）は手動入力が必要。時間がかかるため、Claude CodeのWP-CLIコマンド生成版の提供も可能（希望があれば依頼してください）。
