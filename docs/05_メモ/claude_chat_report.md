# Claude Chat 引き継ぎレポート

## 作成者
Claude Code

## 作業日時
2026年11月01日

## 今回完了したタスク
- プロジェクトフォルダを Dropbox の外に移動
  - 移動前：`~/Library/CloudStorage/Dropbox/Hiroshi/02_プロジェクト関連/★myoko-sweets`
  - 移動後：`/Users/hero/projects/★myoko-sweets`
  - Dropbox 上だと `node_modules` の読み込みが極端に遅く、`next build` が10分以上止まっていたため
  - `node_modules` / `.next` は移さず、移動先で `npm ci` して作り直した
- TOPページを Figma（node 8-3107）に合わせて実装
  - ヒーロー（PC は1440px基準、SP は390px基準で配置）
  - 紹介文
  - タブ＋絞り込み（スイーツ／タイプ／エリア。「すべて表示」で全カテゴリを表示）
  - Store：横長の店舗カード、リスト／グリッド切替、ページ送り（5件ずつ）
  - Feature：3枚のカード。PCは矢印ボタン、SPは横スクロール
  - Enjoy TRIP、News、SNS（ポラロイド風写真のデコレーション付き）
- ヘッダー・フッターを Figma の幅（コンテンツ1080px）に合わせて調整
- 不具合修正
  - `globals.css` のベーススタイル（`a` / `img` など）を `@layer base` に移動。Tailwind のクラスより優先されてしまい、ボタンの文字色や画像サイズが効いていなかった
  - ヘッダーのレスポンシブ指定が逆（`md:` をスマホ向けとして書いていた）だったのを修正
  - Tailwind v4 に存在しないクラス名（`text-brand-brownMain` など）を正しいもの（`text-brand-brown-main`）に置き換え
  - `ShopACF` 型の `access_from_nojiriko_ic` を、ACF の実際のフィールド名 `access_from_shinanomachi_ic` に修正し、`shop_label` を追加

## 作成・変更したファイル
| ファイルパス | 変更内容 |
|---|---|
| web/src/app/page.tsx | TOPの全セクションを組み込み |
| web/src/app/globals.css | Klee One／Zen Maru Gothic 900 を追加、色トークンを追加、ベーススタイルを @layer base に移動 |
| web/src/app/layout.tsx | 存在しないクラス名を修正 |
| web/src/components/top/HeroSection.tsx | Figma の座標で配置し直し、デコレーションを Figma の素材に差し替え |
| web/src/components/top/AboutSection.tsx | 文字サイズ・余白を Figma に合わせた |
| web/src/components/top/ShopsSection.tsx | タブ・絞り込み・Store見出し・表示切替・ページ送り |
| web/src/components/top/ShopCard.tsx | 店舗カード（リスト表示とグリッド表示）を新規作成 |
| web/src/components/top/SectionHeading.tsx | 見出しと「ALL」リンクの共通部品を新規作成 |
| web/src/components/top/FeatureSection.tsx | 新規作成 |
| web/src/components/top/EnjoyTripSection.tsx | 新規作成 |
| web/src/components/top/NewsSection.tsx | 新規作成 |
| web/src/components/top/SnsSection.tsx | 新規作成 |
| web/src/components/layout/Header.tsx | Figma の寸法に合わせ、レスポンシブ指定とクラス名を修正 |
| web/src/components/layout/Footer.tsx | コンテンツ幅を1080pxに |
| web/src/lib/terms.ts | 店舗タイプとドリンクアイコンの対応表を追加 |
| web/src/lib/utils.ts | `stripTags` を追加 |
| web/src/types/index.ts | `shop_label` を追加、信濃町ICのフィールド名を修正 |
| web/public/images/top/icons/, feature/, enjoy/, sns/ | Figma から書き出した素材 |
| .claude/launch.json | 開発サーバーの起動設定 |

## タスク管理の更新内容
| ファイル | タスク名 | 変更前 | 変更後 |
|---|---|---|---|
| 03_WEBサイト/サイト構成.md | トップページ | 🔴 未着手 | 🟡 進行中 |

## 動作確認
| 確認項目 | 結果 |
|---|---|
| TypeScript（tsc --noEmit） | OK |
| ESLint | OK |
| next build | OK（移動後は数秒で完了） |
| ブラウザ表示 1440px / 390px | Figma とほぼ一致 |
| 操作確認 | グリッド切替・すべて表示・エリア絞り込み・該当なし表示 OK |

## Claude Chatへの申し送り事項
- Feature と News は WordPress にまだ投稿タイプがないため、静的データで表示している（`FeatureSection.tsx` / `NewsSection.tsx` の配列）
- SNS ボタンは、アカウント開設前なので「X でシェア」「Instagram のハッシュタグページ」「LINE で送る」にリンクしている
- 駐車場はWordPressにタームがないため、駐車場アイコンは表示していない
- SP版のデザインは Store までしかないため、Feature 以降の SP 表示は PC 版から組んだ
- 未コミット。コミットの判断はユーザー待ち

## 次のステップ提案
- WordPress に店舗を追加登録する（今は「もちや」の1件だけで、一覧や絞り込みの見え方を確認しにくい）
- 店舗詳細ページ（/shop/[slug]）を作る（「お店の詳細へ」のリンク先が未作成）
- 特集・お知らせを WordPress から取得する
- About／プライバシーポリシー／お問い合わせのページを作る（AdSense 審査に必要）

## 気になった点・懸念点
- `web/src/components/top/TabNav.tsx` と `web/src/app/[locale]/page.tsx` はどこからも使われていない（6月の作業の残り）
- ヘッダーの言語切替（JP/EN）とハンバーガーメニューの中身は仮実装のまま
