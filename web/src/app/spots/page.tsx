import type { Metadata } from 'next'
import { Breadcrumb } from '@/components/shop/ShopParts'
import CategoryTabs from '@/components/top/CategoryTabs'
import SeasonSwitch from '@/components/spots/SeasonSwitch'
import GreenSeason from '@/components/spots/GreenSeason'
import WinterSeason from '@/components/spots/WinterSeason'

export const metadata: Metadata = {
  title: '観光スポット',
  description: '妙高高原・野尻湖エリアの観光スポットを、グリーンシーズン・ウィンターシーズンに分けてご案内します。',
}

export default function SpotsPage() {
  return (
    <main className="overflow-x-clip pt-16 md:pt-[72px] text-brand-brown-main">
      <div className="max-w-[1080px] mx-auto px-5 md:px-10 pt-6 md:pt-10">
        <CategoryTabs active="spots" />
      </div>

      {/* ==================== ヒーロー ＋ シーズン切り替え ＋ 中身 ==================== */}
      <SeasonSwitch green={<GreenSeason />} winter={<WinterSeason />} />

      <div className="border-t border-brand-line">
        <div className="max-w-[1080px] mx-auto px-5 md:px-10 py-4 md:py-5">
          <Breadcrumb items={[{ label: 'TOP', href: '/' }, { label: '観光スポット' }]} />
        </div>
      </div>
    </main>
  )
}
