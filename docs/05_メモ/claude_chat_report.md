# Claude Chat 引き継ぎレポート

## 作成者
Claude Code

## 作業日時
2026年11月02日

## 今回完了したタスク
- 特集記事の詳細テンプレート /feature/[slug] を新規作成（ブログ型）
  - データは WordPress の特集記事（カスタム投稿タイプ feature）
  - 構成：ページ見出し（Feature 特集・コラム）→ カテゴリ・日付・タイトル → リード文（抜粋）→ 書いた人・更新日・シェア → アイキャッチ → 目次（h2 が2つ以上のとき自動生成）→ 本文 → シェア → 「この記事を書いた人」→ あわせて読みたい（他の特集）→ 特集・コラム一覧へ → パンくず（最下部）
  - PC は右サイドバー（お知らせと共通部品。特集欄には他の特集を表示）
  - サンプルデータを一時的に入れて PC・SP の表示と目次リンクを確認（確認後に削除済み）
- TOP の特集を、WordPress に特集記事があればそちらを表示するように変更（ない間は今の静的データ）
- お知らせ詳細と共通化：シェアボタン（ShareButtons）、タームやアイキャッチの取得（lib/article.ts）
- CMS：特集カテゴリ（feature_category）を CPT UI のインポート用ファイルに追加し、ターム一覧（スイーツ／カフェ／観光／グルメ／コラム）を wordpress-taxonomy-terms.md に追記

- TOP「Store」の表示切り替え（右のパネルボタン）を新仕様に変更：お店カードのグリッドではなく、各お店の「人気のスイーツ」TOP3 の写真をインスタのようなパネルでランダムに並べる（PC 5列・SP 3列・ページ送りなし・絞り込みに連動）。写真をクリックするとモーダルで、左にスイーツの写真と名前・価格、右にお店の情報（ラベル・店名・エリア・カテゴリ・設備・営業・定休日・お店の詳細へ）を表示。Esc・背景クリック・✗で閉じる

## 作成・変更したファイル
| ファイルパス | 変更内容 |
|---|---|
| web/src/app/feature/[slug]/page.tsx | 特集記事詳細ページ（新規） |
| web/src/components/top/SweetsPanels.tsx | 人気スイーツのパネル一覧とモーダル（新規） |
| web/src/components/top/ShopsSection.tsx | パネル表示への切り替え（切り替えるたびにシャッフル） |
| web/src/components/top/ShopCard.tsx | 使われなくなった ShopGridCard を削除、InfoRow を export |
| web/src/components/article/ShareButtons.tsx | シェアボタン（新規・共通） |
| web/src/lib/article.ts | ターム名・アイキャッチ取得、特集カード変換（新規） |
| web/src/lib/wordpress.ts | getFeatureList・getFeatureBySlug を追加 |
| web/src/lib/utils.ts | buildToc（目次生成）を追加 |
| web/src/lib/staticContent.ts | FeatureCard 型を追加 |
| web/src/components/article/ArticleSidebar.tsx | 特集欄に渡すデータを差し替え可能に |
| web/src/components/top/FeatureSection.tsx | 表示データを受け取れるように、id="feature" を追加 |
| web/src/app/page.tsx | WordPress の特集を取得して TOP に渡す |
| web/src/app/news/[slug]/page.tsx | 共通部品を使うように整理 |
| docs/wordpress-cptui-import.json | 特集カテゴリ（feature_category）を追加 |
| docs/wordpress-taxonomy-terms.md | 特集カテゴリのターム一覧を追加 |

## タスク管理の更新内容
| ファイル | タスク名 | 変更前 | 変更後 |
|---|---|---|---|
| 03_WEBサイト/サイト構成.md | 特集記事詳細 | 🔴 未着手 | 🟡 進行中 |

## Claude Chatへの申し送り事項
- WordPress 管理画面で、CPT UI の「ツール」から wordpress-cptui-import.json を読み込むか、手動で「特集カテゴリ（feature_category）」を特集記事に追加する必要がある。ターム（スイーツ・カフェ・観光・グルメ・コラム）も登録する
- 特集カテゴリを付けない記事は「特集」と表示される
- 特集記事は「抜粋」がリード文になる。本文の見出し2（h2）が2つ以上あると目次が出る
- 「この記事を書いた人」は今は「MYOKOスイーツ編集部」固定
- 特集一覧ページ（/feature）・お知らせ一覧ページ（/news）はまだない。「一覧へ」ボタンは TOP の各欄へ飛ぶ。TOP の「ALL」はまだ /feature・/news を指している

## 次のステップ提案
- 特集・お知らせの一覧ページを作る
- WordPress に特集カテゴリを追加して、実際の特集記事を1本入れて確認する

## 気になった点・懸念点
- 未コミット（店舗詳細ページ以降の作業がすべて未コミット）
