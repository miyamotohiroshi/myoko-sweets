import type { Shop, Spot, WPPost, WPTerm, WPLocation, SweetsCategory, WPImage } from '@/types'

const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

// ============================================
// 店舗情報
// ============================================

// 全店舗を取得
export async function getAllShops(): Promise<Shop[]> {
  const res = await fetch(
    `${WP_API_URL}/wp/v2/shop?per_page=100&_embed`,
    { next: { revalidate: 3600 } }
  )
  if (!res.ok) throw new Error('店舗情報の取得に失敗しました')
  return res.json()
}

// スラッグで1件取得
export async function getShopBySlug(slug: string): Promise<Shop | null> {
  const res = await fetch(
    `${WP_API_URL}/wp/v2/shop?slug=${slug}&_embed`,
    { next: { revalidate: 3600 } }
  )
  if (!res.ok) throw new Error('店舗情報の取得に失敗しました')
  const data = await res.json()
  return data[0] ?? null
}

// エリアで絞り込み
export async function getShopsByArea(areaSlug: string): Promise<Shop[]> {
  const term = await getTermBySlug('area', areaSlug)
  if (!term) return []
  const res = await fetch(
    `${WP_API_URL}/wp/v2/shop?area=${term.id}&per_page=100&_embed`,
    { next: { revalidate: 3600 } }
  )
  if (!res.ok) throw new Error('店舗情報の取得に失敗しました')
  return res.json()
}

// ============================================
// 今月営業中フィルター
// ============================================
export function filterByCurrentMonth(shops: Shop[]): Shop[] {
  const currentMonth = String(new Date().getMonth() + 1)
  return shops.filter(shop => {
    const season = shop.acf?.season
    if (season === 'all_year') return true
    const months: string[] = shop.acf?.operating_months ?? []
    return months.includes(currentMonth)
  })
}

// ============================================
// 現在地から近い順にソート（直線距離）
// ============================================
export function sortByDistance(
  shops: Shop[],
  userLat: number,
  userLng: number
): Shop[] {
  return [...shops].sort((a, b) => {
    const distA = getDistance(userLat, userLng, a.acf?.location?.lat ?? 0, a.acf?.location?.lng ?? 0)
    const distB = getDistance(userLat, userLng, b.acf?.location?.lat ?? 0, b.acf?.location?.lng ?? 0)
    return distA - distB
  })
}

// 2点間の直線距離を計算（km）
export function getDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// 距離から所要時間を概算（平均40km/h想定）
export function estimateDriveMinutes(distanceKm: number): number {
  return Math.round(distanceKm / 40 * 60)
}

// ============================================
// カテゴリ別写真の取得
// ============================================
export function getCategoryPhotos(shop: Shop, category: string) {
  const photos = []

  if (
    shop.acf?.image_main &&
    shop.acf?.image_main_categories?.includes(category as SweetsCategory)
  ) {
    photos.push(shop.acf.image_main)
  }

  for (let i = 1; i <= 20; i++) {
    const num = String(i).padStart(2, '0')
    const image = shop.acf?.[`photo_${num}_image` as keyof typeof shop.acf] as WPImage | null
    const categories = shop.acf?.[`photo_${num}_categories` as keyof typeof shop.acf] as string[]
    if (image && categories?.includes(category)) {
      photos.push(image)
    }
  }

  return photos
}

// カテゴリなしのギャラリー写真を取得
export function getGalleryPhotos(shop: Shop) {
  const photos = []
  for (let i = 1; i <= 20; i++) {
    const num = String(i).padStart(2, '0')
    const image = shop.acf?.[`photo_${num}_image` as keyof typeof shop.acf] as WPImage | null
    const categories = shop.acf?.[`photo_${num}_categories` as keyof typeof shop.acf] as string[]
    if (image && (!categories || categories.length === 0)) {
      photos.push(image)
    }
  }
  return photos
}

// ============================================
// メニューテキストのパース（パイプ区切り形式）
// ============================================
export function parseMenuText(text: string) {
  if (!text) return []
  return text
    .split('\n')
    .filter(line => line.trim())
    .map(line => {
      const parts = line.split('|').map(s => s.trim())
      return {
        name: parts[0] ?? '',
        price: parts[1] ?? '',
        note: parts[2] ?? '',
      }
    })
}

// ============================================
// 観光スポット
// ============================================

// 全スポットを取得
export async function getAllSpots(): Promise<Spot[]> {
  const res = await fetch(
    `${WP_API_URL}/wp/v2/spot?per_page=100&_embed`,
    { next: { revalidate: 3600 } }
  )
  if (!res.ok) throw new Error('スポット情報の取得に失敗しました')
  return res.json()
}

// 近くのスポットを取得（半径3km以内・近い順・最大5件）
export async function getNearbySpots(
  shopLocation: WPLocation,
  featuredSpotIds: number[] = []
): Promise<Spot[]> {
  const allSpots = await getAllSpots()
  const RADIUS_KM = 3
  const MAX_COUNT = 5

  const featured = allSpots.filter(s => featuredSpotIds.includes(s.id))

  const nearby = allSpots
    .filter(s => !featuredSpotIds.includes(s.id))
    .filter(s => {
      if (!s.acf?.location) return false
      const dist = getDistance(
        shopLocation.lat,
        shopLocation.lng,
        s.acf.location.lat,
        s.acf.location.lng
      )
      return dist <= RADIUS_KM
    })
    .sort((a, b) => {
      const distA = getDistance(shopLocation.lat, shopLocation.lng, a.acf?.location?.lat ?? 0, a.acf?.location?.lng ?? 0)
      const distB = getDistance(shopLocation.lat, shopLocation.lng, b.acf?.location?.lat ?? 0, b.acf?.location?.lng ?? 0)
      return distA - distB
    })

  return [...featured, ...nearby].slice(0, MAX_COUNT)
}

// ============================================
// タクソノミー
// ============================================

export async function getTerms(taxonomy: string): Promise<WPTerm[]> {
  const res = await fetch(
    `${WP_API_URL}/wp/v2/${taxonomy}?per_page=100`,
    { next: { revalidate: 86400 } }
  )
  if (!res.ok) return []
  return res.json()
}

export async function getTermBySlug(
  taxonomy: string,
  slug: string
): Promise<WPTerm | null> {
  const res = await fetch(
    `${WP_API_URL}/wp/v2/${taxonomy}?slug=${slug}`,
    { next: { revalidate: 86400 } }
  )
  if (!res.ok) return null
  const data = await res.json()
  return data[0] ?? null
}

// ============================================
// ブログ記事
// ============================================
export async function getPosts(page = 1, perPage = 10): Promise<WPPost[]> {
  const res = await fetch(
    `${WP_API_URL}/wp/v2/posts?page=${page}&per_page=${perPage}&_embed`,
    { next: { revalidate: 3600 } }
  )
  if (!res.ok) throw new Error('記事の取得に失敗しました')
  return res.json()
}

