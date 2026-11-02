import Image from 'next/image'
import Link from 'next/link'
import { GREEN_STYLES, GREEN_THEMES, TRAVEL_LINKS, SPOTS_MAP, MAIN_AREAS } from '@/lib/spotsContent'

function Heading({ en, ja }: { en: string; ja: string }) {
  return (
    <h2 className="flex items-baseline gap-3">
      <span className="font-klee font-semibold text-[26px] md:text-[32px] leading-none tracking-[0.5px] [-webkit-text-stroke:0.6px_currentColor]">{en}</span>
      <span className="text-[13px] md:text-[14px] font-bold text-brand-brown-sub">{ja}</span>
    </h2>
  )
}

const Arrow = () => (
  <Image src="/images/top/icons/card-arrow.svg" alt="" width={60} height={8} className="transition-transform group-hover:translate-x-1" />
)

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

      {/* ==================== 旅のお役立ち ==================== */}
      <section>
        <Heading en="Travel" ja="旅のお役立ち" />
        <p className="mt-3 text-[13px] text-brand-brown-sub">妙高高原周辺を Google マップで探せます</p>
        <ul className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6 max-w-[760px]">
          {TRAVEL_LINKS.map(item => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group mx-auto flex aspect-square w-full max-w-[110px] flex-col items-center justify-center gap-0.5 rounded-full border border-brand-line bg-white text-center transition-all hover:-translate-y-0.5 hover:border-brand-green hover:bg-brand-store-bg"
              >
                <span className="font-klee font-semibold text-[12px] md:text-[13px] leading-none text-brand-brown-sub">{item.en}</span>
                <span className="text-[12px] md:text-[13px] font-bold leading-[1.5]">#{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ==================== 観光マップ ==================== */}
      <section>
        <Heading en="Map" ja="観光マップ" />
        <div className="mt-6 overflow-hidden rounded-[18px] border border-brand-line bg-brand-ivory">
          <iframe
            src={SPOTS_MAP.embed}
            title="妙高高原・野尻湖エリアの地図"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[320px] md:h-[440px] w-full"
          />
        </div>
        <div className="mt-4 flex justify-center md:justify-end">
          <a
            href={SPOTS_MAP.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-brown-main bg-white px-5 h-11 text-[13px] font-bold transition-colors hover:bg-brand-ivory"
          >
            <Image src="/images/top/icons/google-map.svg" alt="" width={16} height={16} />
            GoogleMap（観光地まとめ）
            <Image src="/images/top/icons/external-link.svg" alt="" width={11} height={11} />
          </a>
        </div>
      </section>

      {/* ==================== 主要エリア ==================== */}
      <section>
        <Heading en="Area" ja="主要エリア" />
        <ul className="mt-6 grid gap-3 md:grid-cols-2 md:gap-4">
          {MAIN_AREAS.map(area => (
            <li key={area.name}>
              <a
                href={area.map}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center gap-4 rounded-[14px] bg-white px-5 py-4 shadow-[0_4px_14px_rgba(92,74,42,0.07)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(92,74,42,0.12)]"
              >
                <div className="flex-1 flex flex-col gap-1">
                  <span className="self-start rounded-[3px] bg-brand-gray px-2 py-0.5 text-[11px] font-bold text-brand-brown-sub">{area.access}</span>
                  <span className="text-[16px] md:text-[17px] font-bold">{area.name}</span>
                  <span className="text-[12px] md:text-[13px] leading-[1.7] text-brand-brown-sub">{area.text}</span>
                </div>
                <span className="flex shrink-0 flex-col items-center gap-1 text-[10px] font-bold text-brand-brown-sub">
                  <Image src="/images/top/icons/google-map.svg" alt="" width={20} height={20} className="transition-transform group-hover:scale-110" />
                  MAP
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
