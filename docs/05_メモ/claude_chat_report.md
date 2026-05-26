# Claude Chat 引き継ぎレポート

## 作業日時
2026年05月25日

## 今回完了したタスク
- Next.js プロジェクト（myoko-sweets-web）の初期セットアップ
- フォルダ構造の作成（components / lib / types / locale）
- 型定義ファイルの作成（src/types/index.ts）
- WordPress REST API 接続ファイルの作成（src/lib/wordpress.ts）
- ユーティリティ関数の作成（src/lib/utils.ts）
- 環境変数サンプルファイルの作成（.env.local.example）
- Tailwind CSS v4 ブランドカラー設定（globals.css の @theme ブロックに追加）
- turbopack.root 設定（next.config.ts）で警告を解消

## 作成・変更したファイル

| ファイルパス | 変更内容 |
|---|---|
| myoko-sweets-web/（ルート） | Next.js 16.2.6 プロジェクト新規作成 |
| myoko-sweets-web/src/app/[locale]/page.tsx | 多言語対応用ページ新規作成 |
| myoko-sweets-web/src/types/index.ts | 型定義（Shop / ShopCategory / SeasonType / Locale / WPPost）新規作成 |
| myoko-sweets-web/src/lib/wordpress.ts | WordPress REST API 接続関数新規作成 |
| myoko-sweets-web/src/lib/utils.ts | ユーティリティ関数（cn / formatDate）新規作成 |
| myoko-sweets-web/.env.local.example | 環境変数サンプル新規作成 |
| myoko-sweets-web/src/app/globals.css | ブランドカラー・フォント定義を @theme ブロックに追加 |
| myoko-sweets-web/next.config.ts | turbopack.root を設定 |
| 01_タスク管理/02_WEBサイト.md | WordPress インストール を 🟡 進行中 に更新 |

## タスク管理の更新内容

| ファイル | タスク名 | 変更前 | 変更後 |
|---|---|---|---|
| 02_WEBサイト.md | WordPress インストール | 🔴 未着手 | 🟡 進行中 |

## Claude Chatへの申し送り事項
- Next.js は v16.2.6（最新）、Tailwind CSS は v4（CSS設定方式）で構成
- **重要：ビルド（`npm run build`）がTurbopackのバグでエラーになる**
  - 原因：フォルダパス `02_プロジェクト関連` に日本語が含まれるとTurbopackがクラッシュする
  - 開発サーバー（`npm run dev`）は正常に動作する
  - 本番ビルドはWordPressサーバーへのデプロイ時に対応が必要（Vercelなどは問題なし）
- ブランドカラーは `globals.css` で定義済み（Tailwind v4はconfig.tsではなくCSS設定）
- `NEXT_PUBLIC_WORDPRESS_API_URL` を `.env.local` に設定すればWordPress連携が可能

## 次のステップ提案
- **ドメイン取得**（myoko-sweets.com）：最優先
- **WordPressサーバー契約**（ConoHa WING or Xserver）とWordPressインストール
- **Instagramアカウント開設**
- トップページデザインの実装（src/app/page.tsx）
- 店舗一覧ページの作成（src/app/[locale]/shops/page.tsx）

## 気になった点・懸念点
- **Turbopackビルドエラー**：`npm run build` はJapanese pathバグで失敗。`npm run dev` は問題なし。Vercelへのデプロイ環境では発生しない可能性が高い。
- Tailwind CSS v4は破壊的変更が多い。ネット上の設定例の多くはv3ベースなので注意。
- `tabelog Url` のスペース（構文エラー）は `tabelogUrl` に修正済み。
