'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { WPImage } from '@/types'

type Props = {
  images: WPImage[]  // スライダーで見せる全写真（メイン → サブ → photo_01〜）
  thumbs: WPImage[]  // 下に並べるサムネイル
  name: string
}

function RoundButton({ label, onClick, disabled, children, className = '' }: {
  label: string
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={`absolute z-10 grid place-items-center rounded-full bg-white/85 text-brand-brown-main shadow-[0_2px_10px_rgba(0,0,0,0.15)] backdrop-blur-sm transition-all hover:bg-white disabled:opacity-0 disabled:pointer-events-none ${className}`}
    >
      {children}
    </button>
  )
}

const Chevron = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/** 店舗カードの写真：メイン 2 枚（正方形）＋サムネイル。クリックでメイン 2 枚の上にスライダーを重ねる */
export default function ShopPhotos({ images, thumbs, name }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [startIndex, setStartIndex] = useState(0)
  const [current, setCurrent] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const total = images.length

  // スライダーを開いた直後は、選んだ写真の位置へ一瞬で移動
  useEffect(() => {
    const el = trackRef.current
    if (isOpen && el) el.scrollTo({ left: startIndex * el.clientWidth, behavior: 'instant' })
  }, [isOpen, startIndex])

  // Esc で閉じる
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  const openAt = (i: number) => {
    if (i < 0) return
    setCurrent(i)
    const el = trackRef.current
    if (isOpen && el) {
      el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
    } else {
      setStartIndex(i)
      setIsOpen(true)
    }
  }

  // 現在の番号から移動先を決める（連打しても位置がずれないように）
  const go = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    const next = Math.min(total - 1, Math.max(0, current + dir))
    setCurrent(next)
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' })
  }

  const onScroll = () => {
    const el = trackRef.current
    if (el) setCurrent(Math.round(el.scrollLeft / el.clientWidth))
  }

  return (
    <>
      {/* 開いている間は高さを 1.5 倍に（メイン 2 枚の高さ＝幅の 50% なので、幅の 25% を下に足す） */}
      <div className={`relative transition-[padding] duration-300 ease-out ${isOpen ? 'pb-[25%]' : 'pb-0'}`}>
        {/* メイン 2 枚 */}
        <div className="grid grid-cols-2 gap-[2px]">
          {[0, 1].map(i => (
            <button
              key={i}
              type="button"
              onClick={() => openAt(images[i] ? i : -1)}
              aria-label={images[i] ? `${name}の写真を拡大` : undefined}
              className={`group relative aspect-square overflow-hidden bg-[#E5E5E5] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-brown-sub ${i === 0 ? 'md:rounded-l-[14px]' : 'md:rounded-r-[14px]'}`}
            >
              {images[i] && (
                <Image
                  src={images[i].url}
                  alt={images[i].alt || name}
                  fill
                  sizes="(max-width: 767px) 50vw, 284px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </button>
          ))}
        </div>

        {/* スライダー（メイン 2 枚の上に重ねる） */}
        {isOpen && (
          <div
            role="dialog"
            aria-label={`${name}の写真`}
            className="absolute inset-0 z-10 overflow-hidden bg-[#2A2118] md:rounded-[14px] animate-fade-in"
          >
            <div
              ref={trackRef}
              onScroll={onScroll}
              className="flex h-full overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {images.map((img, i) => (
                <div key={`${img.ID}-${i}`} className="relative h-full w-full shrink-0 snap-center overflow-hidden">
                  {/* 背景：同じ写真をぼかして敷く */}
                  <Image src={img.url} alt="" fill sizes="(max-width: 767px) 100vw, 570px" className="object-cover scale-110 blur-xl opacity-50" />
                  <Image src={img.url} alt={img.alt || `${name}の写真${i + 1}`} fill sizes="(max-width: 767px) 100vw, 570px" className="object-contain" />
                </div>
              ))}
            </div>

            <RoundButton label="前の写真" onClick={() => go(-1)} disabled={current === 0} className="left-3 top-1/2 -translate-y-1/2 size-10">
              <Chevron dir="left" />
            </RoundButton>
            <RoundButton label="次の写真" onClick={() => go(1)} disabled={current >= total - 1} className="right-3 top-1/2 -translate-y-1/2 size-10">
              <Chevron dir="right" />
            </RoundButton>
            {/* 閉じる：枚数表示と同じ半透明の黒で控えめに */}
            <button
              type="button"
              aria-label="写真を閉じる"
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 z-10 grid place-items-center size-8 rounded-full bg-black/40 text-white/90 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>

            {/* 枚数（例：3 / 12） */}
            <p className="absolute bottom-3 right-3 z-10 rounded-full bg-black/45 px-3 py-1 text-[12px] font-bold tracking-[1px] text-white tabular-nums backdrop-blur-sm">
              {current + 1} / {total}
            </p>
          </div>
        )}
      </div>

      {/* サムネイル */}
      {thumbs.length > 0 && (
        <div className="flex gap-[10px] md:gap-[13px] overflow-x-auto md:overflow-hidden px-5 md:px-0 py-1 [scrollbar-width:none]">
          {thumbs.map(p => {
            const index = images.findIndex(img => img.ID === p.ID)
            const active = isOpen && index === current
            return (
              <button
                key={p.ID}
                type="button"
                onClick={() => openAt(index)}
                aria-label={`${name}の写真 ${index + 1} を表示`}
                className={`group relative size-[80px] md:size-[113px] shrink-0 overflow-hidden rounded-[8.6px] bg-[#E5E5E5] transition-all ${active ? 'ring-2 ring-brand-brown-sub ring-offset-2' : 'border border-black/5'}`}
              >
                <Image src={p.url} alt={p.alt || name} fill sizes="113px" className={`object-cover transition-all duration-300 group-hover:scale-105 ${isOpen && !active ? 'opacity-60' : ''}`} />
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}
