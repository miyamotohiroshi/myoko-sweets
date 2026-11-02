import type { Metadata } from 'next'
import Image from 'next/image'
import { Breadcrumb } from '@/components/shop/ShopParts'
import CategoryTabs from '@/components/top/CategoryTabs'
import SeasonSwitch, { type Season } from '@/components/spots/SeasonSwitch'
import GreenSeason from '@/components/spots/GreenSeason'

export const metadata: Metadata = {
  title: '観光スポット',
  description: '妙高高原・野尻湖エリアの観光スポットを、グリーンシーズン・ウィンターシーズンに分けてご案内します。',
}

type Props = { searchParams: Promise<{ season?: string | string[] }> }

// ウィンターシーズンは別デザインで後日追加
function WinterSeason() {
  return (
    <div className="rounded-[18px] bg-[#EEF4F8] px-6 py-16 md:py-20 text-center">
      <p className="font-klee font-semibold text-[28px] md:text-[34px] leading-none text-[#6F8FA6]">Winter</p>
      <p className="mt-4 text-[15px] md:text-[16px] font-bold">ウィンターシーズンの観光情報は準備中です</p>
      <p className="mt-2 text-[13px] text-brand-brown-sub">スキー場やゲレンデグルメなど、冬の楽しみ方をまとめてご紹介する予定です。</p>
    </div>
  )
}

export default async function SpotsPage({ searchParams }: Props) {
  const { season } = await searchParams
  const initial: Season = season === 'winter' ? 'winter' : 'green'

  return (
    <main className="overflow-x-clip pt-16 md:pt-[72px] text-brand-brown-main">
      <div className="max-w-[1080px] mx-auto px-5 md:px-10 pt-6 md:pt-10">
        <CategoryTabs active="spots" />
      </div>

      {/* ==================== ヒーロー（ENJOY TRIP） ==================== */}
      <section className="max-w-[1080px] mx-auto md:px-10 pt-6 md:pt-10">
        <div className="relative aspect-[4/3] md:aspect-[1000/380] overflow-hidden md:rounded-[20px] bg-brand-ivory">
          <Image
            src="/images/top/enjoy/enjoy-collage.png"
            alt="妙高高原・野尻湖のアクティビティ"
            fill
            priority
            sizes="(max-width: 767px) 100vw, 1000px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/40 to-transparent md:from-white/80 md:via-white/30" />
          <div className="absolute left-6 md:left-14 top-1/2 -translate-y-1/2">
            <h1 className="font-klee font-semibold text-[44px] md:text-[64px] leading-[1.05] tracking-[1px] [-webkit-text-stroke:0.8px_currentColor]">
              Enjoy<br />TRIP
            </h1>
            <p className="mt-3 text-[14px] md:text-[17px] font-bold leading-[1.7]">
              妙高高原・野尻湖を<br className="md:hidden" />どう楽しむ？
            </p>
          </div>
        </div>
      </section>

      {/* ==================== シーズン切り替え ＋ 中身 ==================== */}
      <section className="max-w-[1080px] mx-auto px-5 md:px-10 pt-10 md:pt-14 pb-20 md:pb-28">
        <SeasonSwitch initial={initial} green={<GreenSeason />} winter={<WinterSeason />} />
      </section>

      <div className="border-t border-brand-line">
        <div className="max-w-[1080px] mx-auto px-5 md:px-10 py-4 md:py-5">
          <Breadcrumb items={[{ label: 'TOP', href: '/' }, { label: '観光スポット' }]} />
        </div>
      </div>
    </main>
  )
}
