// 店舗情報の型定義
export type Shop = {
  id: number
  slug: string
  name: string
  description: string
  address: string
  area: 'myoko' | 'nojiriko' | 'other'
  categories: ShopCategory[]
  season: SeasonType
  operatingMonths: number[]
  images: {
    main: string
    sub: string
    gallery: string[]
  }
  categoryImages: {
    [key in ShopCategory]?: string
  }
  googleMapUrl: string
  tabelogUrl?: string
  instagramUrl?: string
  websiteUrl?: string
  openingHours?: string
  holiday?: string
  phone?: string
  updatedAt: string
}

// スイーツカテゴリ
export type ShopCategory =
  | 'ice'
  | 'cake'
  | 'parfait'
  | 'crepe'
  | 'gelato'
  | 'wagashi'
  | 'local'
  | 'cafe'

// 営業シーズン
export type SeasonType =
  | 'all_year'
  | 'winter_only'
  | 'green_only'
  | 'limited'

// 多言語対応
export type Locale = 'ja' | 'en'

// WordPress REST API レスポンスの型
export type WPPost = {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  date: string
  modified: string
  acf?: Record<string, unknown>
}
