import Link from 'next/link'
import SectionHeading, { AllLink } from './SectionHeading'
import { getNewsList } from '@/lib/wordpress'
import { stripTags, formatDotDate } from '@/lib/utils'

// WordPress にお知らせがまだない（または取得できない）ときの表示
const FALLBACK_NEWS = [
  { date: '2026.1.1', title: 'webサイトをOPENしました！', href: '/#news' },
]

async function loadNews() {
  try {
    const posts = await getNewsList(3)
    if (posts.length === 0) return FALLBACK_NEWS
    return posts.map(p => ({ date: formatDotDate(p.date), title: stripTags(p.title.rendered), href: `/news/${p.slug}` }))
  } catch {
    return FALLBACK_NEWS
  }
}

export default async function NewsSection() {
  const NEWS = await loadNews()

  return (
    <section id="news" className="scroll-mt-20 pt-12 md:pt-16 pb-14 md:pb-[76px]">
      <div className="max-w-[996px] mx-auto px-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-0">
        <div className="flex items-end justify-between md:w-[333px] shrink-0">
          <SectionHeading en="News" ja="お知らせ" />
          <span className="md:hidden"><AllLink href="/news" icon="news" /></span>
        </div>

        <ul className="flex-1 md:max-w-[518px]">
          {NEWS.map(item => (
            <li key={item.title} className="border-b border-dashed border-brand-green">
              <Link href={item.href} className="flex flex-col md:flex-row md:items-center gap-1 md:gap-[18px] pt-3.5 pb-4 md:pb-[23px] hover:opacity-75">
                <time className="text-[13px] md:text-[14px] font-bold leading-[25.9px] tracking-[0.32px] text-brand-brown-sub">
                  {item.date}
                </time>
                <span className="md:pl-[17px] text-[15px] md:text-[16px] font-bold leading-[29.6px] tracking-[0.32px] text-brand-brown-main">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block ml-auto">
          <AllLink href="/news" icon="news" />
        </div>
      </div>
    </section>
  )
}
