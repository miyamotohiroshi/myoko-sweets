'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Image from 'next/image'
import type { WPImage } from '@/types'
import type { PhotoGroup } from '@/components/top/ShopCard'

function ArrowButton({ dir, onClick }: { dir: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 'left' ? '前の写真' : '次の写真'}
      className={`absolute top-1/2 -translate-y-1/2 ${dir === 'left' ? 'left-2 md:left-6' : 'right-2 md:right-6'} z-10 grid place-items-center size-10 md:size-[46px] rounded-full bg-white/90 border border-brand-beige transition-colors hover:bg-brand-ivory`}
    >
      <Image src={`/images/top/icons/chev-${dir}-round.svg`} alt="" width={20} height={20} />
    </button>
  )
}

// PC は高さ固定で写真の縦横比どおりの幅にする（極端に細長い写真は 3:4〜16:9 に収める）
function pcAspect(photo: WPImage): number {
  const r = photo.width && photo.height ? photo.width / photo.height : 4 / 3
  return Math.min(Math.max(r, 3 / 4), 16 / 9)
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 14 14" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M2 2l10 10M12 2L2 12" />
    </svg>
  )
}

/** 写真一覧のモーダル：カテゴリごとに小さく並べ、押すと大きく表示 */
function PhotoListModal({ groups, name, onClose }: { groups: PhotoGroup[]; name: string; onClose: () => void }) {
  const [selected, setSelected] = useState<WPImage | null>(null)

  // Esc で閉じる（拡大表示中はまず拡大を閉じる）
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (selected) setSelected(null)
      else onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected, onClose])

  // 開いている間は後ろのページをスクロールさせない
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div role="dialog" aria-modal="true" aria-label={`${name}の写真一覧`} className="fixed inset-0 z-[120] flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-brand-brown-main/50" onClick={onClose} />

      <div className="relative w-full md:max-w-[860px] max-h-[92vh] md:max-h-[86vh] flex flex-col rounded-t-[16px] md:rounded-[16px] bg-white overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-5 md:px-7 py-4 border-b border-brand-line">
          <p className="text-[16px] font-bold">写真一覧</p>
          <button type="button" onClick={onClose} aria-label="写真一覧を閉じる" className="grid place-items-center size-9 rounded-full hover:bg-brand-ivory">
            <CloseIcon />
          </button>
        </div>

        <div className="overflow-y-auto px-5 md:px-7 py-5 flex flex-col gap-7">
          {groups.map(group => (
            <section key={group.label}>
              <h3 className="mb-2.5 flex items-baseline gap-2 text-[14px] font-bold">
                {group.label}
                <span className="text-[12px] font-medium text-brand-brown-sub">{group.photos.length}枚</span>
              </h3>
              <ul className="grid grid-cols-3 md:grid-cols-4 gap-1.5">
                {group.photos.map(photo => (
                  <li key={photo.ID}>
                    <button
                      type="button"
                      onClick={() => setSelected(photo)}
                      aria-label="大きく表示"
                      className="relative block w-full aspect-square overflow-hidden rounded-[6px] bg-[#E5E5E5] transition-opacity hover:opacity-85"
                    >
                      <Image src={photo.url} alt={photo.alt || `${name}の${group.label}の写真`} fill sizes="(max-width: 767px) 33vw, 200px" className="object-cover" />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      {/* 拡大表示（どこを押しても閉じる） */}
      {selected && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/85 p-4" onClick={() => setSelected(null)}>
          <div className="relative w-full h-full max-w-[1100px]">
            <Image src={selected.url} alt={selected.alt || name} fill sizes="100vw" className="object-contain" />
          </div>
          <button type="button" onClick={() => setSelected(null)} aria-label="拡大表示を閉じる" className="absolute top-4 right-4 grid place-items-center size-10 rounded-full bg-white/90">
            <CloseIcon />
          </button>
        </div>
      )}
    </div>
  )
}

/** 写真スライダー（SP：1枚ずつ / PC：画面の左端から幅いっぱい・高さ固定で、見える枚数は画面幅しだい）。右下の「写真一覧」でカテゴリ別に一覧表示 */
export default function ShopGallery({ photos, groups, name }: { photos: WPImage[]; groups: PhotoGroup[]; name: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [listOpen, setListOpen] = useState(false)

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  if (photos.length === 0) {
    return <div className="aspect-[4/3] md:aspect-auto md:h-[360px] md:max-w-[1000px] md:mx-auto bg-[#E5E5E5]" />
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-[3px] overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo, i) => (
          <div
            key={`${photo.ID}-${i}`}
            style={{ '--pc-aspect': pcAspect(photo) } as CSSProperties}
            className="relative shrink-0 snap-start w-[86%] aspect-[4/3] md:w-auto md:h-[360px] md:aspect-[var(--pc-aspect)] overflow-hidden bg-[#E5E5E5]"
          >
            <Image
              src={photo.url}
              alt={photo.alt || `${name}の写真${i + 1}`}
              fill
              priority={i < 3}
              sizes="(max-width: 767px) 86vw, 640px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {photos.length > 1 && (
        <>
          <ArrowButton dir="left" onClick={() => scroll(-1)} />
          <ArrowButton dir="right" onClick={() => scroll(1)} />
        </>
      )}

      {groups.length > 0 && (
        <button
          type="button"
          onClick={() => setListOpen(true)}
          className="absolute bottom-3 right-3 md:bottom-4 md:right-6 z-10 inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full bg-white/95 border border-brand-beige text-[12px] md:text-[13px] font-bold shadow-[0_2px_6px_rgba(92,74,42,0.15)] transition-colors hover:bg-brand-ivory"
        >
          <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5" fill="currentColor">
            <rect x="1" y="1" width="6" height="6" rx="1" /><rect x="9" y="1" width="6" height="6" rx="1" />
            <rect x="1" y="9" width="6" height="6" rx="1" /><rect x="9" y="9" width="6" height="6" rx="1" />
          </svg>
          写真一覧（{photos.length}枚）
        </button>
      )}

      {listOpen && <PhotoListModal groups={groups} name={name} onClose={() => setListOpen(false)} />}
    </div>
  )
}
