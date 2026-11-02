'use client'

import { useState } from 'react'
import Image from 'next/image'

export type Season = 'green' | 'winter'

const SEASONS: { id: Season; label: string; en: string; caption: string }[] = [
  { id: 'green',  label: 'グリーンシーズン',   en: 'Green',  caption: '妙高・野尻湖の観光スポットをご案内' },
  { id: 'winter', label: 'ウィンターシーズン', en: 'Winter', caption: 'スキー場情報や冬の楽しみをご案内！' },
]

// ヒーロー画像（シーズンで切り替え）。ウィンターは専用画像ができるまで仮の写真
const HERO_IMAGES: Record<Season, { src: string; alt: string; position: string }> = {
  green:  { src: '/images/top/enjoy/enjoy-collage.png', alt: '妙高高原・野尻湖の夏のアクティビティ', position: 'object-center' },
  winter: { src: '/images/top/enjoy/enjoy-1.jpg',       alt: '妙高のスキー場でスノーボード',       position: 'object-[center_30%]' },
}

/** グリーンシーズン／ウィンターシーズンの切り替え。中身はシーズンごとに別デザインで渡す */
export default function SeasonSwitch({ initial, green, winter }: {
  initial: Season
  green: React.ReactNode
  winter: React.ReactNode
}) {
  const [season, setSeason] = useState<Season>(initial)

  const select = (id: Season) => {
    setSeason(id)
    // 共有したときに同じシーズンが開くよう URL にも残す（再読み込みはしない）
    const url = new URL(window.location.href)
    if (id === 'green') url.searchParams.delete('season')
    else url.searchParams.set('season', id)
    window.history.replaceState(null, '', url)
  }

  return (
    <>
      {/* ==================== ヒーロー（画面幅いっぱい・シーズンで画像を切り替え） ==================== */}
      <section className="relative mt-6 md:mt-10 aspect-[4/3] md:aspect-auto md:h-[clamp(320px,32vw,460px)] overflow-hidden bg-brand-ivory">
        {SEASONS.map(s => (
          <Image
            key={s.id}
            src={HERO_IMAGES[s.id].src}
            alt={HERO_IMAGES[s.id].alt}
            fill
            priority={s.id === initial}
            sizes="100vw"
            className={`object-cover ${HERO_IMAGES[s.id].position} transition-opacity duration-700 ${season === s.id ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/40 to-transparent md:from-white/80 md:via-white/25" />
        <div className="absolute inset-y-0 left-0 right-0 mx-auto max-w-[1080px] px-6 md:px-10 flex flex-col justify-center">
          <h1 className="font-klee font-semibold text-[44px] md:text-[68px] leading-[1.05] tracking-[1px] [-webkit-text-stroke:0.8px_currentColor]">
            Enjoy<br />TRIP
          </h1>
          <p className="mt-3 text-[14px] md:text-[18px] font-bold leading-[1.7]">
            妙高高原・野尻湖を<br className="md:hidden" />どう楽しむ？
          </p>
        </div>
      </section>

      <div className="max-w-[1080px] mx-auto px-5 md:px-10 pt-10 md:pt-14 pb-20 md:pb-28">
        <div className="flex flex-col items-center gap-3">
          <div role="tablist" aria-label="シーズン" className="flex w-full max-w-[460px] rounded-full border border-brand-line bg-white p-1">
            {SEASONS.map(s => {
              const active = season === s.id
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => select(s.id)}
                  className={`flex-1 flex flex-col items-center rounded-full py-1.5 md:py-2 transition-colors ${
                    active
                      ? s.id === 'green' ? 'bg-brand-green text-brand-brown-main' : 'bg-[#DCE9F2] text-brand-brown-main'
                      : 'text-brand-brown-sub hover:bg-brand-ivory'
                  }`}
                >
                  <span className="font-klee font-semibold text-[11px] md:text-[12px] leading-none tracking-[1px]">{s.en}</span>
                  <span className="text-[13px] md:text-[15px] font-bold leading-[1.6]">{s.label}</span>
                </button>
              )
            })}
          </div>
          <p className="text-[13px] md:text-[14px] font-bold text-brand-brown-sub">{SEASONS.find(s => s.id === season)?.caption}</p>
        </div>

        <div role="tabpanel" className="mt-10 md:mt-14">
          {season === 'green' ? green : winter}
        </div>
      </div>
    </>
  )
}
