import type { Shop } from '@/types'
import { getAllShops, getFeatureList } from '@/lib/wordpress'
import { toFeatureCard } from '@/lib/article'
import { FEATURES } from '@/lib/staticContent'
import HeroSection       from '@/components/top/HeroSection'
import AboutSection      from '@/components/top/AboutSection'
import ShopsSection      from '@/components/top/ShopsSection'
import FeatureSection    from '@/components/top/FeatureSection'
import EnjoyTripSection  from '@/components/top/EnjoyTripSection'
import NewsSection       from '@/components/top/NewsSection'
import SnsSection        from '@/components/top/SnsSection'

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ sweets?: string | string[] }>
}) {
  const { sweets } = await searchParams

  let shops: Shop[] = []
  try {
    shops = await getAllShops()
  } catch {
    // WordPress API 未接続時はカード非表示
  }

  // 特集は WordPress に投稿があればそれを、なければ静的データを表示
  let features = FEATURES
  try {
    const posts = await getFeatureList(6)
    if (posts.length > 0) features = posts.map(toFeatureCard)
  } catch {
    // 取得できないときは静的データのまま
  }

  return (
    <main className="overflow-x-clip">
      <HeroSection />
      <AboutSection />
      <ShopsSection shops={shops} initialSweets={typeof sweets === 'string' ? sweets : undefined} />
      <FeatureSection items={features} />
      <EnjoyTripSection />
      <NewsSection />
      <SnsSection />
    </main>
  )
}
