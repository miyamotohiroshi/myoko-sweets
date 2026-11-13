'use client'

import { useRef, type CSSProperties } from 'react'
import Image from 'next/image'
import type { WPImage } from '@/types'

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

/** 写真スライダー（SP：1枚ずつ / PC：画面の左端から幅いっぱい・高さ固定で、見える枚数は画面幅しだい） */
export default function ShopGallery({ photos, name }: { photos: WPImage[]; name: string }) {
  const trackRef = useRef<HTMLDivElement>(null)

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
    </div>
  )
}
