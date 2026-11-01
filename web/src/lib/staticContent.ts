// WordPress 側の投稿ができるまで使う静的データ（TOP とサイドバーで共用）

// 特集カード（TOP の特集・サイドバーで使う形）
export type FeatureCard = {
  href:     string
  image:    string | null
  category: string
  title:    string[]  // 改行位置ごとに分ける
}

// 特集記事（WordPress の特集投稿ができるまでは静的データ）
export const FEATURES: FeatureCard[] = [
  {
    href:     '/feature',
    image:    '/images/top/feature/feature-1.png',
    category: 'スイーツ',
    title:    ['新潟・長野の食材を使ったスイーツ', 'を紹介しました'],
  },
  {
    href:     '/feature',
    image:    '/images/top/feature/feature-2.png',
    category: 'スイーツ',
    title:    ['スキー場で楽しむゲレンデスイーツ', 'を特集'],
  },
  {
    href:     '/feature',
    image:    '/images/top/feature/feature-3.png',
    category: 'コラム',
    title:    ['妙高・野尻湖エリアの', '蕎麦屋をまとめてご紹介します'],
  },
]
