'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Shop, ShopACF, WPImage } from '@/types'
import { stripTags } from '@/lib/utils'
import { toCardData, ShopLabel, AreaBadge, Tags, Features, InfoRow } from './ShopCard'

type Panel = {
  key:   string
  image: WPImage
  name:  string
  price: string
  shop:  Shop
}

// 各お店の「人気のスイーツ」TOP3 をパネルにする（画像があるものだけ）
function toPanels(shops: Shop[]): Panel[] {
  return shops.flatMap(shop =>
    [1, 2, 3].flatMap(n => {
      const acf   = shop.acf
      const image = acf[`popular_sweets_${n}_image` as keyof ShopACF] as WPImage | null
      const name  = (acf[`popular_sweets_${n}_name` as keyof ShopACF] as string) ?? ''
      const price = (acf[`popular_sweets_${n}_price` as keyof ShopACF] as string) ?? ''
      return image?.url ? [{ key: `${shop.id}-${n}`, image, name, price, shop }] : []
    }),
  )
}

// seed で決まるランダム順（同じ seed なら同じ並び。絞り込みを変えても並びが暴れない）
function shuffle<T>(items: T[], seed: number): T[] {
  let s = seed || 1
  const rand = () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// ============================================================
// モーダル（左：スイーツの写真と名前 / 右：お店の情報）
// ============================================================
function SweetsModal({ panel, onClose }: { panel: Panel; onClose: () => void }) {
  const d = toCardData(panel.shop)
  // お店の写真：サブ画像（外観など）→ メイン画像の順。スイーツと同じ写真なら出さない
  const shopImage = [d.subImg, d.mainImg].find(img => img?.url && img.url !== panel.image.url) ?? null
  const [showShop, setShowShop] = useState(false)

  // Esc で閉じる・開いている間は背景をスクロールさせない
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[120] grid place-items-center p-4 md:p-8 animate-fade-in">
      <div className="absolute inset-0 bg-brand-brown-main/50 backdrop-blur-sm" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${panel.name}（${d.name}）`}
        className="relative w-full max-w-[880px] max-h-[calc(100dvh-32px)] overflow-y-auto rounded-[20px] bg-white shadow-[0_20px_60px_rgba(42,33,24,0.25)] md:flex md:overflow-hidden"
      >
        <button
          type="button"
          aria-label="閉じる"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        {/* 左：スイーツ（右下の丸い写真を押すとお店の写真と入れ替わる） */}
        <div className="relative aspect-square md:w-1/2 shrink-0 overflow-hidden bg-brand-ivory">
          <Image
            src={panel.image.url}
            alt={panel.name || d.name}
            fill
            sizes="(max-width: 767px) 100vw, 440px"
            className={`object-cover transition-opacity duration-500 ${showShop ? 'opacity-0' : 'opacity-100'}`}
          />
          {shopImage && (
            <Image
              src={shopImage.url}
              alt={`${d.name}のお店`}
              fill
              sizes="(max-width: 767px) 100vw, 440px"
              className={`object-cover transition-opacity duration-500 ${showShop ? 'opacity-100' : 'opacity-0'}`}
            />
          )}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent pl-5 pr-24 pb-4 pt-12 text-white">
            {showShop ? (
              <>
                <p className="text-[11px] font-bold tracking-[1px] opacity-80">お店</p>
                <p className="mt-0.5 text-[18px] md:text-[20px] font-bold leading-[1.5]">{d.name}</p>
                {d.area && <p className="text-[14px] font-bold opacity-90">{d.area}</p>}
              </>
            ) : (
              <>
                <p className="text-[11px] font-bold tracking-[1px] opacity-80">人気のスイーツ</p>
                <p className="mt-0.5 text-[18px] md:text-[20px] font-bold leading-[1.5]">{panel.name}</p>
                {panel.price && <p className="text-[14px] font-bold opacity-90">{panel.price}</p>}
              </>
            )}
          </div>

          {/* 入れ替え用の丸い写真（今は出ていない方を表示） */}
          {shopImage && (
            <button
              type="button"
              onClick={() => setShowShop(v => !v)}
              aria-label={showShop ? 'スイーツの写真を見る' : 'お店の写真を見る'}
              className="group absolute bottom-4 right-4 z-10 flex flex-col items-center gap-1"
            >
              <span className="relative block size-[52px] md:size-14 overflow-hidden rounded-full border-2 border-white shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-110">
                <Image
                  key={showShop ? 'sweets' : 'shop'}
                  src={showShop ? panel.image.url : shopImage.url}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover animate-fade-in"
                />
              </span>
              <span className="text-[10px] font-bold tracking-[0.5px] text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
                {showShop ? 'スイーツ' : 'お店'}
              </span>
            </button>
          )}
        </div>

        {/* 右：お店の情報 */}
        <div className="flex flex-col px-5 md:px-8 pt-5 md:pt-8 pb-6 md:w-1/2">
          <ShopLabel label={d.label} />
          <div className="flex items-start justify-between gap-3 border-b border-brand-brown-main pt-1 pb-3 md:pr-8">
            <p className="text-[20px] md:text-[22px] font-bold leading-[1.5] tracking-[0.32px]">{d.name}</p>
            <AreaBadge area={d.area} />
          </div>
          <div className="pt-4">
            <Tags categories={d.categories} drinks={d.drinks} />
          </div>
          <div className="pt-2">
            <Features features={d.features} />
          </div>
          {(d.hours || d.holiday) && (
            <dl className="mt-3 grid grid-cols-[56px_1fr] gap-x-3 gap-y-2.5 border-t border-dashed border-brand-line pt-4 text-[13px] md:text-[14px] leading-[1.7] tracking-[0.32px]">
              {d.hours && <InfoRow label="営業">{d.hours}</InfoRow>}
              {d.holiday && <InfoRow label="定休日">{d.holiday}</InfoRow>}
            </dl>
          )}
          <Link
            href={d.href}
            className="relative mt-6 md:mt-auto flex h-12 items-center justify-center rounded-full bg-brand-brown-sub text-[14px] font-bold tracking-[0.32px] text-white transition-opacity hover:opacity-85"
          >
            お店の詳細へ
            <Image src="/images/top/icons/arrow-white.svg" alt="" width={16} height={16} className="absolute right-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

// ============================================================
// パネル一覧（インスタのような正方形の写真グリッド）
// ============================================================
export default function SweetsPanels({ shops, seed }: { shops: Shop[]; seed: number }) {
  const panels = useMemo(() => shuffle(toPanels(shops), seed), [shops, seed])
  const [active, setActive] = useState<Panel | null>(null)
  const close = useCallback(() => setActive(null), [])

  if (panels.length === 0) {
    return <p className="py-20 text-center text-sm text-brand-brown-sub">人気のスイーツが登録されたお店がまだありません</p>
  }

  return (
    <>
      <ul className="-mx-5 md:mx-0 grid grid-cols-3 md:grid-cols-5 gap-[3px] md:gap-1.5">
        {panels.map(panel => (
          <li key={panel.key}>
            <button
              type="button"
              onClick={() => setActive(panel)}
              aria-label={`${panel.name}（${stripTags(panel.shop.title.rendered)}）を見る`}
              className="group relative block aspect-square w-full overflow-hidden bg-brand-ivory md:rounded-[6px]"
            >
              <Image
                src={panel.image.url}
                alt=""
                fill
                sizes="(max-width: 767px) 33vw, 200px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* ホバーでスイーツ名を出す（PC） */}
              <span className="absolute inset-0 hidden md:flex flex-col items-center justify-center gap-0.5 bg-black/35 px-2 text-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-[14px] font-bold leading-[1.5]">{panel.name}</span>
                <span className="text-[11px] font-bold opacity-85">{stripTags(panel.shop.title.rendered)}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active && <SweetsModal key={active.key} panel={active} onClose={close} />}
    </>
  )
}
