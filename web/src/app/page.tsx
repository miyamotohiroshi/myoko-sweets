import type { Shop } from '@/types'
import { getAllShops } from '@/lib/wordpress'
import HeroSection       from '@/components/top/HeroSection'
import AboutSection      from '@/components/top/AboutSection'
import ShopsSection      from '@/components/top/ShopsSection'
import FeatureSection    from '@/components/top/FeatureSection'
import EnjoyTripSection  from '@/components/top/EnjoyTripSection'
import NewsSection       from '@/components/top/NewsSection'
import SnsSection        from '@/components/top/SnsSection'

export default async function HomePage() {
  let shops: Shop[] = []
  try {
    shops = await getAllShops()
  } catch {
    // WordPress API 未接続時はカード非表示
  }

  return (
    <main className="overflow-x-clip">
      <HeroSection />
      <AboutSection />
      <ShopsSection shops={shops} />
      <FeatureSection />
      <EnjoyTripSection />
      <NewsSection />
      <SnsSection />
    </main>
  )
}
