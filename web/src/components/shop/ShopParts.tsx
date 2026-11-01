import Image from 'next/image'
import Link from 'next/link'
import type { Spot, WPImage } from '@/types'
import { stripTags } from '@/lib/utils'
import { SPOT_CATEGORY_MAP } from '@/lib/terms'

const ICON = '/images/top/icons'

// ============================================================
// 見出し（英字 Klee One ＋ 日本語）
// ============================================================
export function DetailHeading({ en, ja, id }: { en: string; ja: string; id?: string }) {
  return (
    // Klee One は 600 が最大なので、文字と同色の縁取りで太さを足す
    <h2 id={id} className="scroll-mt-[124px] md:scroll-mt-[168px] flex items-baseline gap-3">
      <span className="font-klee font-semibold text-[24px] md:text-[28px] leading-none tracking-[0.5px] [-webkit-text-stroke:0.6px_currentColor]">{en}</span>
      <span className="text-[13px] md:text-[14px] font-bold leading-none tracking-[0.32px] text-brand-brown-sub">{ja}</span>
    </h2>
  )
}

// ============================================================
// パンくず
// ============================================================
export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="パンくずリスト">
      <ol className="flex flex-wrap items-center gap-x-2 text-[12px] md:text-[13px] font-bold tracking-[0.32px] text-brand-brown-sub">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <Image src={`${ICON}/chev-right.svg`} alt="" width={10} height={10} />}
            {item.href ? <Link href={item.href} className="hover:opacity-75">{item.label}</Link> : <span aria-current="page">{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// ============================================================
// 外部リンクボタン（Google Map など）
// ============================================================
export function MapButton({ href, small = false }: { href: string; small?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-1 bg-white border border-brand-brown-main rounded-full font-bold tracking-[0.32px] text-brand-brown-main transition-colors hover:bg-brand-ivory ${small ? 'h-8 px-3 text-[12px]' : 'h-11 w-[150px] text-[13px]'}`}
    >
      <Image src={`${ICON}/google-map.svg`} alt="" width={small ? 14 : 18} height={small ? 14 : 18} />
      GoogleMap
      <Image src={`${ICON}/external-link.svg`} alt="" width={11} height={11} className="ml-0.5" />
    </a>
  )
}

// ============================================================
// 人気のスイーツ・人気の食事
// ============================================================
export type PopularItem = { image: WPImage | null; name: string; price: string }

export function PopularList({ title, items }: { title: string; items: PopularItem[] }) {
  if (!items.length) return null
  return (
    <div className="pt-8">
      <h3 className="text-[16px] md:text-[17px] font-bold tracking-[0.32px]">{title}</h3>
      <ol className="mt-4 grid gap-4 md:grid-cols-3 md:gap-5">
        {items.map((item, i) => (
          <li key={item.name} className="flex md:flex-col items-center md:items-stretch gap-4 md:gap-2">
            <span className="w-5 shrink-0 font-klee text-[22px] leading-none md:hidden">{i + 1}</span>
            <div className="relative size-[88px] md:size-auto md:aspect-square shrink-0 overflow-hidden rounded-[8px] bg-[#E5E5E5]">
              {item.image && <Image src={item.image.url} alt={item.name} fill sizes="(max-width: 767px) 88px, 240px" className="object-cover" />}
              <span className="hidden md:grid absolute left-2 top-2 place-items-center size-8 rounded-full bg-white/90 font-klee text-[18px]">{i + 1}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-bold leading-[1.6]">{item.name}</span>
              {item.price && <span className="text-[14px] text-brand-brown-sub">{item.price}</span>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

// ============================================================
// 口コミサマリー
// ============================================================
export function ReviewList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map(text => (
        <li key={text} className="flex items-start gap-3 text-[15px] leading-[1.8]">
          <svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22" fill="none" className="mt-1 shrink-0 text-brand-brown-sub">
            <path d="M11 2.5c-4.7 0-8.5 3.2-8.5 7.2 0 2.2 1.2 4.2 3 5.5L4.8 19l4.1-2.3c.7.1 1.4.2 2.1.2 4.7 0 8.5-3.2 8.5-7.2S15.7 2.5 11 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="7.5" cy="9.8" r="1" fill="currentColor" /><circle cx="11" cy="9.8" r="1" fill="currentColor" /><circle cx="14.5" cy="9.8" r="1" fill="currentColor" />
          </svg>
          <span>{text}</span>
        </li>
      ))}
    </ul>
  )
}

// ============================================================
// 近くの施設（アコーディオン）
// ============================================================
export function SpotAccordion({ spots }: { spots: Spot[] }) {
  return (
    <ul className="flex flex-col">
      {spots.map(spot => {
        const name = stripTags(spot.title.rendered)
        const tags = (spot.spot_category ?? []).map(id => SPOT_CATEGORY_MAP[id]).filter(Boolean)
        const desc = stripTags(spot.acf?.spot_description ?? '').split('\n').map(s => s.trim()).filter(Boolean)
        return (
          <li key={spot.id} className="border-b border-brand-line">
            <details className="group">
              <summary className="flex items-center gap-4 py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <div className="relative size-[60px] md:size-[72px] shrink-0 overflow-hidden rounded-[6px] bg-[#E5E5E5]">
                  {spot.acf?.image_main && <Image src={spot.acf.image_main.url} alt={name} fill sizes="72px" className="object-cover" />}
                </div>
                <div className="flex-1 flex flex-col items-start gap-1">
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {tags.map(tag => (
                        <span key={tag} className="bg-brand-tag rounded-[2px] px-2 py-0.5 text-[11px] font-bold leading-[1.5] tracking-[0.32px] text-brand-brown-sub">{tag}</span>
                      ))}
                    </div>
                  )}
                  <span className="text-[15px] md:text-[16px] font-bold leading-[1.6]">{name}</span>
                </div>
                <Image src={`${ICON}/chev-down.svg`} alt="" width={14} height={14} className="shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <div className="mb-5 pl-[76px] md:pl-[88px] flex flex-col gap-3 text-[14px] leading-[1.8]">
                {desc.map(line => <p key={line}>{line}</p>)}
                {spot.acf?.address && <p className="text-brand-brown-sub">{spot.acf.address}</p>}
                <div className="flex flex-col gap-1.5">
                  {spot.acf?.website_url && (
                    <a href={spot.acf.website_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-bold hover:opacity-75">
                      ▸ 公式サイト
                      <Image src={`${ICON}/external-link.svg`} alt="" width={11} height={11} />
                    </a>
                  )}
                  {spot.acf?.google_map_url && (
                    <a href={spot.acf.google_map_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-bold hover:opacity-75">
                      ▸ Google Map
                      <Image src={`${ICON}/external-link.svg`} alt="" width={11} height={11} />
                    </a>
                  )}
                </div>
              </div>
            </details>
          </li>
        )
      })}
    </ul>
  )
}

// ============================================================
// 営業月カレンダー（1〜12月）
// ============================================================
export function MonthCalendar({ months }: { months: string[] }) {
  const current = new Date().getMonth() + 1
  return (
    <ol className="grid grid-cols-6 md:grid-cols-12 gap-1 text-center text-[12px]">
      {Array.from({ length: 12 }, (_, i) => i + 1).map(m => {
        const open = months.includes(String(m))
        return (
          <li
            key={m}
            className={`flex flex-col rounded-[4px] py-1 ${open ? 'bg-brand-green/40' : 'bg-brand-gray text-brand-brown-sub/60'} ${m === current ? 'ring-1 ring-brand-brown-main' : ''}`}
          >
            <span>{m}月</span>
            <span aria-label={open ? '営業' : '休業'} className="font-bold">{open ? '○' : '−'}</span>
          </li>
        )
      })}
    </ol>
  )
}
