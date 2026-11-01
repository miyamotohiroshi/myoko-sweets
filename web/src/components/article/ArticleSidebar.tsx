import Image from 'next/image'
import Link from 'next/link'
import type { WPPost } from '@/types'
import { SITE_INFO } from '@/config/site'
import { FEATURES, type FeatureCard } from '@/lib/staticContent'
import { stripTags, formatDotDate } from '@/lib/utils'

function SideHeading({ en, ja }: { en: string; ja: string }) {
  return (
    <h2 className="flex items-baseline gap-2 border-b border-brand-line pb-3 font-klee font-semibold text-[20px] leading-none">
      <span className="[-webkit-text-stroke:0.5px_currentColor]">{en}</span>
      <span className="font-sans text-[12px] font-bold text-brand-brown-sub">{ja}</span>
    </h2>
  )
}

/** 記事詳細の右サイドバー（お知らせ・特集の詳細で共用） */
export default function ArticleSidebar({ news, features = FEATURES, currentSlug }: {
  news: WPPost[]
  features?: FeatureCard[]  // 特集・コラム欄（WordPress の特集がなければ静的データ）
  currentSlug?: string
}) {
  return (
    <div className="flex flex-col gap-10">

      {/* 新着のお知らせ */}
      {news.length > 0 && (
        <section>
          <SideHeading en="NEWS" ja="新着のお知らせ" />
          <ul>
            {news.slice(0, 5).map(post => {
              const current = post.slug === currentSlug
              return (
                <li key={post.id} className="border-b border-dashed border-brand-line">
                  <Link
                    href={`/news/${post.slug}`}
                    aria-current={current ? 'page' : undefined}
                    className={`flex flex-col gap-0.5 py-3 transition-opacity hover:opacity-70 ${current ? 'pointer-events-none' : ''}`}
                  >
                    <time dateTime={post.date} className="text-[12px] font-bold tracking-[0.32px] text-brand-brown-sub">{formatDotDate(post.date)}</time>
                    <span className={`text-[14px] font-bold leading-[1.6] ${current ? 'text-brand-brown-sub' : ''}`}>
                      {current && <span className="mr-1.5 inline-block size-[6px] -translate-y-0.5 rounded-full bg-brand-green" />}
                      {stripTags(post.title.rendered)}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {/* 特集・コラム */}
      {features.length > 0 && (
      <section>
        <SideHeading en="Feature" ja="特集・コラム" />
        <ul className="mt-4 flex flex-col gap-4">
          {features.slice(0, 4).map(item => (
            <li key={item.href + item.title.join('')}>
              <Link href={item.href} className="group flex items-center gap-3">
                <div className="relative size-[76px] shrink-0 overflow-hidden rounded-[10px] bg-brand-ivory">
                  {item.image && <Image src={item.image} alt="" fill sizes="76px" className="object-cover transition-transform duration-500 group-hover:scale-105" />}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-brand-brown-sub">
                    <span className="size-[6px] rounded-full bg-brand-green" />
                    {item.category}
                  </span>
                  <span className="text-[13px] font-bold leading-[1.6] group-hover:opacity-75">{item.title.join('')}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      )}

      {/* お店をさがす */}
      <Link
        href="/#store"
        className="group relative flex flex-col gap-1 overflow-hidden rounded-[14px] bg-brand-store-bg px-6 py-5 transition-shadow hover:shadow-[0_6px_18px_rgba(92,74,42,0.1)]"
      >
        <span className="font-klee font-semibold text-[18px] leading-none">Store</span>
        <span className="text-[14px] font-bold">妙高のスイーツのお店をさがす</span>
        <Image src="/images/sweets/cake.svg" alt="" width={56} height={56} className="absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
      </Link>

      {/* SNS */}
      <section>
        <SideHeading en="Follow" ja="公式SNS" />
        <div className="mt-4 flex gap-3">
          <a
            href={`https://www.instagram.com/${SITE_INFO.instagram}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-brand-line bg-white py-2.5 text-[13px] font-bold transition-colors hover:bg-brand-ivory"
          >
            <Image src="/images/top/sns/icon-instagram.svg" alt="" width={18} height={18} />
            Instagram
          </a>
          <a
            href={`https://x.com/${SITE_INFO.twitter}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-brand-line bg-white py-2.5 text-[13px] font-bold transition-colors hover:bg-brand-ivory"
          >
            <Image src="/images/top/sns/icon-x.svg" alt="" width={16} height={16} />
            X
          </a>
        </div>
        <p className="mt-3 text-[12px] leading-[1.8] text-brand-brown-sub">
          {SITE_INFO.hashtag} を付けて、妙高のスイーツをシェアしてね！
        </p>
      </section>
    </div>
  )
}
