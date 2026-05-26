const WP_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

// 全店舗情報を取得
export async function getAllShops() {
  const res = await fetch(`${WP_API_URL}/wp/v2/shop?per_page=100&_embed`)
  if (!res.ok) throw new Error('店舗情報の取得に失敗しました')
  return res.json()
}

// 店舗情報を1件取得
export async function getShopBySlug(slug: string) {
  const res = await fetch(`${WP_API_URL}/wp/v2/shop?slug=${slug}&_embed`)
  if (!res.ok) throw new Error('店舗情報の取得に失敗しました')
  const data = await res.json()
  return data[0] ?? null
}

// ブログ記事を取得
export async function getPosts(page = 1, perPage = 10) {
  const res = await fetch(
    `${WP_API_URL}/wp/v2/posts?page=${page}&per_page=${perPage}&_embed`
  )
  if (!res.ok) throw new Error('記事の取得に失敗しました')
  return res.json()
}

// 現在の月に営業している店舗のみフィルタリング
export function filterByCurrentMonth(shops: any[]) {
  const currentMonth = new Date().getMonth() + 1
  return shops.filter((shop) => {
    if (shop.acf?.season === 'all_year') return true
    const months: number[] = shop.acf?.operating_months ?? []
    return months.includes(currentMonth)
  })
}
