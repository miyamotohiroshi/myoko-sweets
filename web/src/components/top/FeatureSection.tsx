'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SectionHeading, { AllLink } from './SectionHeading'

// 特集記事（WordPress 側の特集投稿ができるまでは静的データ）
const FEATURES = [
  {
    href:     '/feature',
    image:    '/images/top/feature/feature-1.png',
    category: 'スイーツ',
    title:    ['新潟・長野の食材を使ったスイーツ', 'を紹介しました'],
  },
  {
    href:     '/feature',
    image:    '/images/top/feature/feature-2.png',
    category: 'スイーツ',
    title:    ['スキー場で楽しむゲレンデスイーツ', 'を特集'],
  },
  {
    href:     '/feature',
    image:    '/images/top/feature/feature-3.png',
    category: 'コラム',
    title:    ['妙高・野尻湖エリアの', '蕎麦屋をまとめてご紹介します'],
  },
]

function ArrowButton({ dir, onClick }: { dir: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 'left' ? '前へ' : '次へ'}
      className="hidden md:grid place-items-center size-[46px] shrink-0 rounded-full bg-white border border-brand-beige transition-colors hover:bg-brand-ivory"
    >
      <Image src={`/images/top/icons/chev-${dir}-round.svg`} alt="" width={20} height={20} />
    </button>
  )
}

export default function FeatureSection() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <section className="py-12 md:py-[60px]">
      <div className="max-w-[1130px] mx-auto px-5 md:px-[60px] flex items-end justify-between">
        <SectionHeading en="Feature" ja="特集・コラム" />
        <AllLink href="/feature" icon="feature" />
      </div>

      <div className="max-w-[1130px] mx-auto mt-6 md:mt-[30px] flex items-center gap-[18px]">
        <ArrowButton dir="left" onClick={() => scroll(-1)} />

        <div
          ref={trackRef}
          className="flex-1 min-w-0 flex gap-4 md:gap-[26px] overflow-x-auto snap-x snap-mandatory px-5 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {FEATURES.map(item => (
            <Link
              key={item.image}
              href={item.href}
              className="group snap-start shrink-0 w-[78%] md:w-[calc((100%-52px)/3)] flex flex-col gap-1.5 text-brand-brown-main"
            >
              <div className="relative h-[200px] md:h-[235px] overflow-hidden rounded-[14px] border border-brand-beige bg-brand-ivory">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 767px) 78vw, 316px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="flex items-center gap-1.5 pt-2 text-[13px] font-bold leading-6 tracking-[0.32px]">
                <span className="size-[7px] rounded-full bg-brand-green" />
                {item.category}
              </p>
              <h3 className="text-[15px] md:text-[16px] font-bold leading-6 tracking-[0.32px]">
                {item.title[0]}
                <br />
                {item.title[1]}
              </h3>
              <div className="flex justify-end pt-2.5">
                <Image
                  src="/images/top/icons/card-arrow.svg"
                  alt=""
                  width={79}
                  height={10}
                  className="transition-transform group-hover:translate-x-1"
                />
              </div>
            </Link>
          ))}
        </div>

        <ArrowButton dir="right" onClick={() => scroll(1)} />
      </div>
    </section>
  )
}
