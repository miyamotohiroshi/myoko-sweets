// ============================================
// 多言語対応
// ============================================
export type Locale = 'ja' | 'en'

// ============================================
// タクソノミー
// ============================================
export type ShopType = 'sweets' | 'cafe' | 'restaurant' | 'souvenir'

export type SweetsCategory =
  | 'cake'
  | 'crepe'
  | 'ice'
  | 'pudding'
  | 'parfait'
  | 'gelato'
  | 'cookie'
  | 'wagashi'
  | 'local'
  | 'kakigori'
  | 'cream_puff'
  | 'pancake'

export type DrinkCategory =
  | 'coffee'
  | 'tea'
  | 'green_tea'
  | 'beer'
  | 'cocktail'
  | 'wine_white'
  | 'wine_red'

export type Area = 'myoko' | 'nojiriko' | 'arai' | 'other'

export type Feature =
  | 'has_seat'
  | 'takeout'
  | 'takeout_only'
  | 'has_food'
  | 'has_wifi'
  | 'has_power'

export type SeasonType =
  | 'all_year'
  | 'winter_only'
  | 'green_only'
  | 'limited'

export type PaymentMethod =
  | 'cash'
  | 'credit'
  | 'ic'
  | 'qr'

// ============================================
// 画像
// ============================================
export type WPImage = {
  ID: number
  url: string
  width: number
  height: number
  alt: string
  title: string
}

// ============================================
// 座標（ACF Google Map）
// ============================================
export type WPLocation = {
  lat: number
  lng: number
  address: string
}

// ============================================
// カテゴリ別写真（photo_01〜20）
// ============================================
export type CategoryPhoto = {
  image: WPImage | null
  categories: SweetsCategory[]
}

// ============================================
// 人気メニュー
// ============================================
export type PopularItem = {
  image: WPImage | null
  name: string
  price: string
}

// ============================================
// 店舗情報（ACFフィールド）
// ============================================
export type ShopACF = {
  // 基本情報
  catchcopy: string
  shop_description: string
  address: string
  location: WPLocation | null
  tel: string
  access: string
  access_from_myoko_ic: string
  access_from_nojiriko_ic: string
  access_from_nojiriko: string

  // 営業情報
  season: SeasonType
  operating_months: string[]  // ['1','2','3',...,'12']
  operating_months_note: string
  opening_hours: string
  holiday: string

  // 画像
  image_main: WPImage | null
  image_main_categories: SweetsCategory[]
  image_sub: WPImage | null
  photo_01_image: WPImage | null
  photo_01_categories: SweetsCategory[]
  photo_02_image: WPImage | null
  photo_02_categories: SweetsCategory[]
  photo_03_image: WPImage | null
  photo_03_categories: SweetsCategory[]
  photo_04_image: WPImage | null
  photo_04_categories: SweetsCategory[]
  photo_05_image: WPImage | null
  photo_05_categories: SweetsCategory[]
  photo_06_image: WPImage | null
  photo_06_categories: SweetsCategory[]
  photo_07_image: WPImage | null
  photo_07_categories: SweetsCategory[]
  photo_08_image: WPImage | null
  photo_08_categories: SweetsCategory[]
  photo_09_image: WPImage | null
  photo_09_categories: SweetsCategory[]
  photo_10_image: WPImage | null
  photo_10_categories: SweetsCategory[]
  photo_11_image: WPImage | null
  photo_11_categories: SweetsCategory[]
  photo_12_image: WPImage | null
  photo_12_categories: SweetsCategory[]
  photo_13_image: WPImage | null
  photo_13_categories: SweetsCategory[]
  photo_14_image: WPImage | null
  photo_14_categories: SweetsCategory[]
  photo_15_image: WPImage | null
  photo_15_categories: SweetsCategory[]
  photo_16_image: WPImage | null
  photo_16_categories: SweetsCategory[]
  photo_17_image: WPImage | null
  photo_17_categories: SweetsCategory[]
  photo_18_image: WPImage | null
  photo_18_categories: SweetsCategory[]
  photo_19_image: WPImage | null
  photo_19_categories: SweetsCategory[]
  photo_20_image: WPImage | null
  photo_20_categories: SweetsCategory[]

  // 人気メニュー（スイーツ）
  popular_sweets_1_image: WPImage | null
  popular_sweets_1_name: string
  popular_sweets_1_price: string
  popular_sweets_2_image: WPImage | null
  popular_sweets_2_name: string
  popular_sweets_2_price: string
  popular_sweets_3_image: WPImage | null
  popular_sweets_3_name: string
  popular_sweets_3_price: string

  // 人気メニュー（食事）
  popular_food_1_image: WPImage | null
  popular_food_1_name: string
  popular_food_1_price: string
  popular_food_2_image: WPImage | null
  popular_food_2_name: string
  popular_food_2_price: string
  popular_food_3_image: WPImage | null
  popular_food_3_name: string
  popular_food_3_price: string

  // メニュー（HTML）
  menu_sweets: string
  menu_drinks: string
  menu_food: string

  // 口コミ
  review_summary: string

  // 外部リンク
  google_map_url: string
  tabelog_url: string
  instagram_url: string
  twitter_url: string
  website_url: string

  // 設備・支払い
  payment_methods: PaymentMethod[]

  // 近くの施設（手動ピックアップ）
  featured_spots: number[]  // スポットの投稿ID
}

// ============================================
// 店舗（WordPress投稿 + ACF）
// ============================================
export type Shop = {
  id: number
  slug: string
  title: { rendered: string }
  date: string
  modified: string
  acf: ShopACF
  // タクソノミー
  shop_type: number[]
  sweets_category: number[]
  drink_category: number[]
  area: number[]
  features: number[]
}

// ============================================
// 観光スポット（ACFフィールド）
// ============================================
export type SpotACF = {
  spot_description: string
  address: string
  location: WPLocation | null
  image_main: WPImage | null
  website_url: string
  google_map_url: string
}

export type Spot = {
  id: number
  slug: string
  title: { rendered: string }
  acf: SpotACF
  spot_category: number[]
  area: number[]
}

// ============================================
// タクソノミータームの型
// ============================================
export type WPTerm = {
  id: number
  slug: string
  name: string
  taxonomy: string
  count: number
}

// ============================================
// WordPress REST API 投稿の基本型
// ============================================
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

// ============================================
// サイト設定（将来の横展開対応）
// ============================================
export type SiteConfig = {
  tabs: ('sweets' | 'tourism' | 'model_plan' | 'cafe' | 'event')[]
  defaultArea: Area
  searchRadiusKm: number
}
