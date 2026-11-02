import Image from 'next/image'
import Link from 'next/link'
import { GREEN_STYLES, GREEN_THEMES, SPOTS_MAP, MAIN_AREAS } from '@/lib/spotsContent'
import { Heading, Arrow, Thumb, TravelSection, MapSection } from './SpotParts'

/** 観光スポットページ：グリーンシーズンの中身 */
export default function GreenSeason() {
  return (
    <div className="flex flex-col gap-16 md:gap-24">

      {/* ==================== 楽しみ方で選ぶ ==================== */}
      <section>
        <Heading en="Style" ja="楽しみ方で選ぶ" />
        <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-8">
          {GREEN_STYLES.map(item => (
            <Link key={item.en} href={item.href} className="group flex flex-col gap-3">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] bg-brand-ivory">
                <Image src={item.image} alt="" fill sizes="(max-width: 767px) 100vw, 500px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                <div className="absolute left-5 bottom-4 md:left-6 md:bottom-5 text-white">
                  <p className="font-klee font-semibold text-[34px] md:text-[44px] leading-none [-webkit-text-stroke:0.5px_currentColor]">{item.en}</p>
                  <p className="mt-1 text-[14px] md:text-[16px] font-bold tracking-[0.5px]">{item.lead}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[15px] md:text-[17px] font-bold">{item.title}</span>
                <Arrow />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ==================== テーマで選ぶ ==================== */}
      <section>
        <Heading en="Theme" ja="テーマで選ぶ" />
        <ul className="mt-6 grid gap-4 md:grid-cols-3 md:gap-6">
          {GREEN_THEMES.map(item => (
            <li key={item.title}>
              <Link href={item.href} className="group flex md:flex-col items-center md:items-stretch gap-4 md:gap-3">
                <div className="relative w-[120px] md:w-full aspect-[4/3] shrink-0 overflow-hidden rounded-[12px] bg-brand-ivory">
                  <Image src={item.image} alt="" fill sizes="(max-width: 767px) 120px, 320px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <span className="text-[15px] md:text-[16px] font-bold">{item.title}</span>
                  <Arrow />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <TravelSection />

      <MapSection
        ja="観光マップ"
        embed={SPOTS_MAP.embed}
        link={SPOTS_MAP.link}
        label="GoogleMap（観光地まとめ）"
        title="妙高高原・野尻湖エリアの地図"
      />

      {/* ==================== 主要エリア ==================== */}
      <section>
        <Heading en="Area" ja="主要エリア" />
        <ul className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-5 md:gap-x-6 md:gap-y-8">
          {MAIN_AREAS.map(area => (
            <li key={area.name}>
              <a
                href={area.map}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${area.name}を Google マップで見る`}
                className="group flex h-full flex-col overflow-hidden rounded-[14px] bg-white shadow-[0_4px_14px_rgba(92,74,42,0.07)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(92,74,42,0.12)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-store-bg">
                  <Thumb src={area.image} sizes="(max-width: 767px) 50vw, 330px" />
                  <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-brand-brown-sub shadow-sm backdrop-blur-sm">
                    <Image src="/images/top/icons/google-map.svg" alt="" width={12} height={12} />
                    MAP
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-1.5 px-3 md:px-5 pt-3 md:pt-4 pb-4 md:pb-5">
                  <span className="self-start rounded-[3px] bg-brand-gray px-2 py-0.5 text-[10px] md:text-[11px] font-bold text-brand-brown-sub">{area.access}</span>
                  <span className="text-[15px] md:text-[17px] font-bold leading-[1.5]">{area.name}</span>
                  <span className="text-[12px] md:text-[13px] leading-[1.7] text-brand-brown-sub">{area.text}</span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
