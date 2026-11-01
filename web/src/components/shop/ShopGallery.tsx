'use client'

import { useRef } from 'react'
import Image from 'next/image'
import type { WPImage } from '@/types'

function ArrowButton({ dir, onClick }: { dir: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 'left' ? '前の写真' : '次の写真'}
      className={`absolute top-1/2 -translate-y-1/2 ${dir === 'left' ? 'left-2 md:-left-[23px]' : 'right-2 md:-right-[23px]'} z-10 grid place-items-center size-10 md:size-[46px] rounded-full bg-white/90 border border-brand-beige transition-colors hover:bg-brand-ivory`}
    >
      <Image src={`/images/top/icons/chev-${dir}-round.svg`} alt="" width={20} height={20} />
    </button>
  )
}

/** 写真スライダー（SP：1枚ずつ / PC：3枚並び） */
export default function ShopGallery({ photos, name }: { photos: WPImage[]; name: string }) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  if (photos.length === 0) {
    return <div className="aspect-[4/3] md:aspect-[3/1] bg-[#E5E5E5] md:rounded-[14px]" />
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-[3px] md:gap-3 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo, i) => (
          <div
            key={`${photo.ID}-${i}`}
            className="relative shrink-0 snap-start w-[86%] md:w-[calc((100%-24px)/3)] aspect-[4/3] overflow-hidden bg-[#E5E5E5] md:rounded-[14px]"
          >
            <Image
              src={photo.url}
              alt={photo.alt || `${name}の写真${i + 1}`}
              fill
              priority={i < 3}
              sizes="(max-width: 767px) 86vw, 340px"
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
