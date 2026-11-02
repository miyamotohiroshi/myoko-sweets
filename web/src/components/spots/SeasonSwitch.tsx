'use client'

import { useState } from 'react'

export type Season = 'green' | 'winter'

const SEASONS: { id: Season; label: string; en: string }[] = [
  { id: 'green',  label: 'グリーンシーズン',   en: 'Green' },
  { id: 'winter', label: 'ウィンターシーズン', en: 'Winter' },
]

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
        <p className="text-[13px] md:text-[14px] font-bold text-brand-brown-sub">妙高・野尻湖の観光スポットをご案内</p>
      </div>

      <div role="tabpanel" className="mt-10 md:mt-14">
        {season === 'green' ? green : winter}
      </div>
    </>
  )
}
