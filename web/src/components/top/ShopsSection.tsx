'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import type { Shop } from '@/types'
import ShopCard, { ShopGridCard } from './ShopCard'
import SectionHeading from './SectionHeading'
import {
  SWEETS_CATEGORY_MAP,
  TYPE_FILTER_MAP,
  AREA_FILTER_MAP,
} from '@/lib/terms'

// ============================================================
// 定数
// ============================================================
const TABS = [
  { id: 'sweets', label: 'スイーツ',     sub: 'sweets' },
  { id: 'spots',  label: '観光スポット', sub: 'spot' },
  { id: 'plans',  label: 'モデルプラン', sub: 'plan' },
] as const

type TabId = (typeof TABS)[number]['id']
type ViewMode = 'list' | 'grid'

// スイーツ名 → term ID
const SWEETS_ID_BY_NAME = Object.fromEntries(
  Object.entries(SWEETS_CATEGORY_MAP).map(([id, name]) => [name, Number(id)]),
)
const SWEETS_MAIN  = ['ケーキ', 'プリン', 'クレープ', 'アイス', 'シュークリーム', '和菓子', 'かき氷', 'パンケーキ']
const SWEETS_MORE  = Object.values(SWEETS_CATEGORY_MAP).filter(name => !SWEETS_MAIN.includes(name))
const TYPE_OPTIONS = Object.keys(TYPE_FILTER_MAP)
const AREA_OPTIONS = Object.keys(AREA_FILTER_MAP)

const ALL = 'すべて'
const PER_PAGE = 5

// ============================================================
// フィルタリング
// ============================================================
function filterShops(shops: Shop[], sweets: string, type: string, area: string): Shop[] {
  return shops.filter(shop => {
    if (sweets !== ALL && !shop.sweets_category?.includes(SWEETS_ID_BY_NAME[sweets])) return false
    if (type !== ALL && !(TYPE_FILTER_MAP[type] ?? []).some(id => shop.features?.includes(id))) return false
    if (area !== ALL && !shop.area?.includes(AREA_FILTER_MAP[area])) return false
    return true
  })
}

// ============================================================
// メインコンポーネント
// ============================================================
export default function ShopsSection({ shops }: { shops: Shop[] }) {
  const [activeTab,    setActiveTab]    = useState<TabId>('sweets')
  const [sweetsFilter, setSweetsFilter] = useState(ALL)
  const [typeFilter,   setTypeFilter]   = useState(ALL)
  const [areaFilter,   setAreaFilter]   = useState(ALL)
  const [showAllSweets, setShowAllSweets] = useState(false)
  const [view, setView] = useState<ViewMode>('list')
  const [page, setPage] = useState(1)

  const filteredShops = useMemo(
    () => filterShops(shops, sweetsFilter, typeFilter, areaFilter),
    [shops, sweetsFilter, typeFilter, areaFilter],
  )
  const totalPages = Math.max(1, Math.ceil(filteredShops.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const pageShops = filteredShops.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

  // フィルター変更時は1ページ目に戻す
  const withReset = (setter: (v: string) => void) => (v: string) => { setter(v); setPage(1) }

  return (
    <>
      {/* ==================== タブ + フィルター ==================== */}
      <section className="max-w-[1080px] mx-auto px-5 md:px-10">
        <div className="flex">
          {TABS.map(tab => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-pressed={isActive}
                className={[
                  'relative flex-1 min-h-[58px] md:min-h-[70px] pt-2.5 md:pt-[11px] rounded-t-[14px] border-2 transition-colors',
                  isActive
                    ? 'bg-white border-brand-beige border-b-transparent'
                    : 'border-transparent border-b-brand-beige',
                ].join(' ')}
              >
                <span className={[
                  'block font-bold text-[14px] md:text-[18px] leading-[31.45px] tracking-[0.32px]',
                  isActive ? 'text-brand-brown-main' : 'text-brand-brown-sub',
                ].join(' ')}>
                  {tab.label}
                </span>
                <span
                  aria-hidden="true"
                  className={[
                    'block -rotate-4 -mt-2 font-klee font-semibold text-[12px] md:text-[17px] leading-[24px] md:leading-[31.45px] tracking-[0.68px] text-brand-green transition-opacity',
                    isActive ? 'opacity-100' : 'opacity-0',
                  ].join(' ')}
                >
                  {tab.sub}
                </span>
              </button>
            )
          })}
        </div>

        {activeTab === 'sweets' && (
          <div className="pt-4 md:pt-[26px]">
            <FilterRow
              label="スイーツ"
              items={showAllSweets ? [...SWEETS_MAIN, ...SWEETS_MORE] : SWEETS_MAIN}
              active={sweetsFilter}
              onSelect={withReset(setSweetsFilter)}
              more={{ open: showAllSweets, toggle: () => setShowAllSweets(v => !v) }}
            />
            <FilterRow label="タイプ" items={TYPE_OPTIONS} active={typeFilter} onSelect={withReset(setTypeFilter)} />
            <FilterRow label="エリア" items={AREA_OPTIONS} active={areaFilter} onSelect={withReset(setAreaFilter)} last />
          </div>
        )}
      </section>

      {/* ==================== Store ==================== */}
      {activeTab === 'sweets' ? (
        <section id="store" className="relative scroll-mt-16 pt-12 md:pt-20 pb-16 md:pb-[70px]">
          {/* 左側の淡い背景（Figma: bg-store-section） */}
          <div aria-hidden="true" className="absolute left-0 top-[100px] md:top-[80px] w-[28%] md:w-[37.4%] h-[min(1275px,80%)] bg-brand-store-bg" />

          <div className="relative max-w-[1040px] mx-auto px-5">
            <div className="flex items-end justify-between">
              <SectionHeading en="Store" ja="お店一覧" />
              <div className="flex gap-3 md:gap-4">
                <ViewButton mode="list" icon="list" label="リスト表示" view={view} onClick={setView} />
                <ViewButton mode="grid" icon="grid" label="グリッド表示" view={view} onClick={setView} />
              </div>
            </div>

            <div className="mt-10 md:mt-[60px]">
              {pageShops.length === 0 ? (
                <p className="py-20 text-center text-sm text-brand-brown-sub">条件に合うお店が見つかりませんでした</p>
              ) : view === 'list' ? (
                <div className="flex flex-col gap-16 md:gap-[100px]">
                  {pageShops.map(shop => <ShopCard key={shop.id} shop={shop} />)}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-[26px] gap-y-10">
                  {pageShops.map(shop => <ShopGridCard key={shop.id} shop={shop} />)}
                </div>
              )}
            </div>

            <div className="mt-16 md:mt-[100px] h-px bg-brand-beige/70" />
            <Pagination current={currentPage} total={totalPages} onChange={setPage} />
          </div>
        </section>
      ) : (
        <section className="max-w-[1080px] mx-auto px-5 md:px-10 py-20 text-center text-sm text-brand-brown-sub">
          近日公開予定です
        </section>
      )}
    </>
  )
}

// ============================================================
// フィルター行
// ============================================================
function FilterRow({
  label,
  items,
  active,
  onSelect,
  more,
  last = false,
}: {
  label: string
  items: readonly string[]
  active: string
  onSelect: (v: string) => void
  more?: { open: boolean; toggle: () => void }
  last?: boolean
}) {
  const pill = (item: string, i: number) => {
    const isActive = active === item
    return (
      <button
        key={item}
        type="button"
        onClick={() => onSelect(item)}
        aria-pressed={isActive}
        className={[
          'relative px-3 md:px-[14px] py-0.5 rounded-[8px] text-[13px] md:text-[14px] leading-[25.9px] tracking-[0.32px] text-brand-brown-main transition-colors',
          isActive ? 'bg-brand-green font-bold' : 'font-medium hover:text-brand-brown-sub',
        ].join(' ')}
      >
        {/* 区切り線（「すべて」の直後の項目には付けない） */}
        {i > 1 && !isActive && (
          <span aria-hidden="true" className="absolute left-0 top-1/2 -translate-y-1/2 h-[15px] w-px bg-brand-beige" />
        )}
        {item}
      </button>
    )
  }

  return (
    <div className={[
      'flex flex-col md:flex-row md:items-center gap-2 md:gap-[18px] py-3 md:pt-[13px] md:pb-[14px]',
      last ? '' : 'border-b border-dashed border-brand-beige/70',
    ].join(' ')}>
      <span className="md:w-16 shrink-0 text-[13px] md:text-[14px] font-bold leading-[25.9px] tracking-[0.32px] text-brand-brown-sub">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-y-1.5">
        {[ALL, ...items].map(pill)}
        {more && (
          <button
            type="button"
            onClick={more.toggle}
            aria-expanded={more.open}
            className="relative flex items-center gap-1.5 px-[14px] py-0.5 ml-auto md:ml-0 text-[13px] md:text-[14px] font-medium leading-[25.9px] tracking-[0.32px] text-brand-brown-sub"
          >
            <span aria-hidden="true" className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-[15px] w-px bg-brand-beige" />
            {more.open ? '閉じる' : 'すべて表示'}
            <Image
              src="/images/top/icons/chev-down.svg"
              alt=""
              width={13}
              height={13}
              className={`transition-transform ${more.open ? 'rotate-180' : ''}`}
            />
          </button>
        )}
      </div>
    </div>
  )
}

// ============================================================
// 表示切替ボタン（アイコン色を切り替えるため mask で描画）
// ============================================================
function ViewButton({
  mode, icon, label, view, onClick,
}: {
  mode: ViewMode
  icon: string
  label: string
  view: ViewMode
  onClick: (m: ViewMode) => void
}) {
  const isActive = view === mode
  return (
    <button
      type="button"
      onClick={() => onClick(mode)}
      aria-label={label}
      aria-pressed={isActive}
      className={[
        'grid place-items-center size-10 rounded-[10px] border transition-colors',
        isActive
          ? 'bg-brand-brown-main border-brand-brown-main text-white'
          : 'bg-white border-brand-beige text-brand-brown-sub hover:bg-brand-ivory',
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className="size-5 bg-current"
        style={{
          maskImage: `url(/images/top/icons/${icon}.svg)`,
          WebkitMaskImage: `url(/images/top/icons/${icon}.svg)`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
        }}
      />
    </button>
  )
}

// ============================================================
// ページネーション
// ============================================================
function pageList(current: number, total: number): (number | '…')[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set([1, total, current - 1, current, current + 1].filter(p => p >= 1 && p <= total))
  const sorted = [...pages].sort((a, b) => a - b)
  return sorted.flatMap((p, i) => (i > 0 && p - sorted[i - 1] > 1 ? ['…' as const, p] : [p]))
}

function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
  const box = 'grid place-items-center min-w-[42px] h-[42px] px-3 rounded-[10px] border text-[16px] font-bold leading-[27.75px] tracking-[0.32px] transition-colors'
  const go = (p: number) => {
    onChange(p)
    document.getElementById('store')?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <nav aria-label="ページ送り" className="flex items-center justify-center gap-2.5 pt-10">
      <button
        type="button"
        onClick={() => go(current - 1)}
        disabled={current === 1}
        aria-label="前のページ"
        className={`${box} bg-white border-brand-beige disabled:opacity-40`}
      >
        <Image src="/images/top/icons/chev-left.svg" alt="" width={18} height={18} />
      </button>
      {pageList(current, total).map((p, i) =>
        p === '…' ? (
          <span key={`gap-${i}`} className="min-w-[42px] text-center text-[16px] font-bold">···</span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => go(p)}
            aria-current={p === current ? 'page' : undefined}
            className={`${box} ${p === current
              ? 'bg-brand-brown-main border-brand-brown-main text-white'
              : 'bg-white border-brand-beige text-brand-brown-main hover:bg-brand-ivory'}`}
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        onClick={() => go(current + 1)}
        disabled={current === total}
        aria-label="次のページ"
        className={`${box} bg-white border-brand-beige disabled:opacity-40`}
      >
        <Image src="/images/top/icons/chev-right.svg" alt="" width={18} height={18} />
      </button>
    </nav>
  )
}
