import Link from 'next/link'
import {
  WINTER_FEATURES,
  WINTER_TIPS,
  SKI_TAGS,
  SKI_RESORTS_FEATURED,
  SKI_RESORTS_MORE,
  SKI_MAP,
} from '@/lib/spotsContent'
import SnsSection from '@/components/top/SnsSection'
import { Heading, Arrow, Thumb, TravelSection, MapSection } from './SpotParts'

/** 観光スポットページ：ウィンターシーズンの中身 */
export default function WinterSeason() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">

      {/* ==================== 冬の楽しみ方 ==================== */}
      <section>
        <Heading en="Winter" ja="冬の楽しみ方" />
        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {WINTER_FEATURES.map(item => (
            <li key={item.title}>
              <Link href={item.href} className="group flex flex-col gap-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-brand-ivory">
                  <Thumb src={item.image} sizes="(max-width: 767px) 100vw, 330px" season="winter" />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[15px] md:text-[16px] font-bold leading-[1.6]">{item.title}</span>
                  <Arrow />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ==================== 冬のお役立ち ==================== */}
      <section>
        <Heading en="Tips" ja="冬のお役立ち" />
        <ul className="mt-6 grid gap-4 md:grid-cols-2 md:gap-x-8 md:gap-y-6">
          {WINTER_TIPS.map(item => (
            <li key={item.title}>
              <Link href={item.href} className="group flex items-center gap-4">
                <div className="relative w-[120px] md:w-[150px] aspect-[4/3] shrink-0 overflow-hidden rounded-[12px]">
                  <Thumb src={item.image} sizes="150px" season="winter" />
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <span className="text-[15px] md:text-[16px] font-bold leading-[1.6]">{item.title}</span>
                  {item.sub && <span className="text-[12px] md:text-[13px] text-brand-brown-sub">（{item.sub}）</span>}
                  <span className="mt-1"><Arrow /></span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <TravelSection />

      {/* ==================== スキー場 ==================== */}
      <section>
        <Heading en="Ski" ja="スキー場" />
        <ul className="mt-6 flex flex-col">
          {SKI_RESORTS_FEATURED.map(resort => (
            <li key={resort.name} className="border-t border-brand-line py-6 last:border-b">
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="group relative aspect-[16/10] md:w-[42%] shrink-0 overflow-hidden rounded-[14px]">
                  <Thumb src={resort.image} sizes="(max-width: 767px) 100vw, 420px" season="winter" />
                </div>
                <div className="flex flex-col gap-2 md:justify-center">
                  <a href={resort.map} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 self-start text-[18px] md:text-[20px] font-bold">
                    {resort.name}
                    <span className="text-brand-brown-sub transition-transform group-hover:translate-x-1">›</span>
                  </a>
                  <p className="text-[13px] md:text-[14px] leading-[1.8] text-brand-brown-sub">{resort.text}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {SKI_TAGS.map(tag => (
                      <li key={tag} className="rounded-full border border-brand-line bg-white px-3 py-1 text-[12px] font-bold">{tag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* その他のスキー場 */}
        <ul className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-3">
          {SKI_RESORTS_MORE.map(resort => (
            <li key={resort.name}>
              <a
                href={resort.map}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center gap-2 rounded-[10px] bg-[#EEF4F8] px-3 py-3 text-[13px] md:text-[14px] font-bold transition-colors hover:bg-[#E2EDF4]"
              >
                <span className="size-2 shrink-0 rounded-full border-2 border-[#9DB7C9]" />
                <span className="flex-1">{resort.name}</span>
                <span className="text-brand-brown-sub transition-transform group-hover:translate-x-0.5">›</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <MapSection
        ja="スキー場マップ"
        embed={SKI_MAP.embed}
        link={SKI_MAP.link}
        label="GoogleMap（スキー場まとめ）"
        title="妙高周辺のスキー場の地図"
      />

      <div className="-mx-5 md:-mx-10">
        <SnsSection />
      </div>
    </div>
  )
}
