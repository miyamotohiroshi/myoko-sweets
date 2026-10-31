'use client'

import { useState } from 'react'

const TABS = [
  { id: 'sweets', label: 'スイーツ', sub: 'sweets' },
  { id: 'spots',  label: '観光スポット', sub: null },
  { id: 'plans',  label: 'モデルプラン', sub: null },
] as const

const SWEETS_CATS  = ['ケーキ', 'プリン', 'クレープ', 'アイス', 'シュークリーム', '和菓子', 'かき氷', 'パンケーキ']
const TYPE_OPTIONS = ['座席あり', '持ち帰り', '電源席あり']
const AREA_OPTIONS = ['妙高高原', '野尻湖', '新井・中郷']

type TabId = (typeof TABS)[number]['id']

export default function TabNav() {
  const [activeTab,    setActiveTab]    = useState<TabId>('sweets')
  const [sweetsFilter, setSweetsFilter] = useState('すべて')
  const [typeFilter,   setTypeFilter]   = useState('すべて')
  const [areaFilter,   setAreaFilter]   = useState('すべて')

  return (
    <section className="bg-white pb-8 md:pb-10">
      <div className="max-w-250 mx-auto px-5">

        {/* タブ行：border-b がタブ下の仕切り線。active タブは -mb-px と border-b-white でその線を消す */}
        <div className="flex border-b border-brand-beige">
          {TABS.map(tab => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={[
                  'flex-1 pt-5 pb-4 text-center transition-colors',
                  isActive
                    ? 'border border-brand-beige [border-bottom-color:white] -mb-px rounded-t-xl bg-white'
                    : '',
                ].join(' ')}
              >
                <span className={[
                  'block text-sm md:text-[15px] font-medium',
                  isActive ? 'text-brand-brown-main' : 'text-brand-brown-sub',
                ].join(' ')}>
                  {tab.label}
                </span>
                {tab.sub && isActive && (
                  <span className="block text-[11px] text-brand-green mt-0.5">{tab.sub}</span>
                )}
              </button>
            )
          })}
        </div>

        {/* フィルター行（スイーツタブのみ） */}
        {activeTab === 'sweets' && (
          <div className="pt-1">
            <FilterRow
              label="スイーツ"
              items={SWEETS_CATS}
              active={sweetsFilter}
              onSelect={setSweetsFilter}
              hasMore
            />
            <FilterRow
              label="タイプ"
              items={TYPE_OPTIONS}
              active={typeFilter}
              onSelect={setTypeFilter}
            />
            <FilterRow
              label="エリア"
              items={AREA_OPTIONS}
              active={areaFilter}
              onSelect={setAreaFilter}
            />
          </div>
        )}

      </div>
    </section>
  )
}

function FilterRow({
  label,
  items,
  active,
  onSelect,
  hasMore = false,
}: {
  label: string
  items: readonly string[]
  active: string
  onSelect: (v: string) => void
  hasMore?: boolean
}) {
  return (
    <div className="border-b border-dashed border-brand-beige last:border-b-0 py-3">
      <div className="flex flex-col md:flex-row md:items-center gap-y-2">

        {/* ラベル */}
        <span className="text-[12px] text-brand-brown-sub shrink-0 md:w-[56px]">{label}</span>

        {/* フィルターチップ */}
        <div className="flex flex-wrap items-center gap-y-2">

          {/* 「すべて」チップ */}
          <button
            onClick={() => onSelect('すべて')}
            className={[
              'px-3 py-[3px] rounded-full text-[12px] font-medium transition-colors',
              active === 'すべて'
                ? 'bg-brand-green text-brand-brown-main'
                : 'text-brand-brown-sub hover:text-brand-brown-main',
            ].join(' ')}
          >
            すべて
          </button>

          {/* その他アイテム */}
          {items.map(item => (
            <span key={item} className="flex items-center">
              <span className="text-brand-beige mx-2 text-[11px] select-none">|</span>
              <button
                onClick={() => onSelect(item)}
                className={[
                  'text-[12px] transition-colors',
                  active === item
                    ? 'text-brand-brown-main font-medium'
                    : 'text-brand-brown-sub hover:text-brand-brown-main',
                ].join(' ')}
              >
                {item}
              </button>
            </span>
          ))}

          {/* すべて表示 */}
          {hasMore && (
            <span className="flex items-center">
              <span className="text-brand-beige mx-2 text-[11px] select-none">|</span>
              <button className="flex items-center gap-1 text-[12px] text-brand-brown-sub hover:text-brand-brown-main transition-colors">
                すべて表示
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
                  <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </span>
          )}

        </div>
      </div>
    </div>
  )
}
