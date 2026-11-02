import type { Metadata } from 'next'
import Link from 'next/link'
import { getNewsPage, getFeatureList } from '@/lib/wordpress'
import { FEATURES } from '@/lib/staticContent'
import { stripTags, formatDotDate } from '@/lib/utils'
import { getTermNames, toFeatureCard } from '@/lib/article'
import { Breadcrumb } from '@/components/shop/ShopParts'
import ArticleSidebar from '@/components/article/ArticleSidebar'
import PageBand from '@/components/article/PageBand'
import ListPagination from '@/components/article/ListPagination'

export const metadata: Metadata = {
  title: 'お知らせ',
  description: 'MYOKOスイーツからのお知らせ一覧です。',
}

type Props = { searchParams: Promise<{ page?: string | string[] }> }

export default async function NewsListPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, Number(typeof pageParam === 'string' ? pageParam : 1) || 1)

  const [{ posts, totalPages }, features] = await Promise.all([
    getNewsPage(page, 10).catch(() => ({ posts: [], totalPages: 0 })),
    getFeatureList(4).catch(() => []),
  ])

  return (
    <main className="overflow-x-clip pt-16 md:pt-[72px] text-brand-brown-main">
      <PageBand en="News" ja="お知らせ" as="h1" />

      <div className="max-w-[1080px] mx-auto px-5 md:px-10 pt-8 md:pt-12 pb-16 md:pb-24 md:grid md:grid-cols-[1fr_300px] md:gap-12 lg:gap-16">

        {/* ==================== 一覧 ==================== */}
        <section className="min-w-0">
          {posts.length === 0 ? (
            <p className="rounded-[14px] bg-brand-gray px-5 py-16 text-center text-[14px] text-brand-brown-sub">
              お知らせはまだありません
            </p>
          ) : (
            <ul className="border-t border-dashed border-brand-line">
              {posts.map(post => (
                <li key={post.id} className="border-b border-dashed border-brand-line">
                  <Link href={`/news/${post.slug}`} className="group flex items-center gap-4 py-5 md:py-6">
                    <div className="flex-1 flex flex-col md:flex-row md:items-center gap-1.5 md:gap-6">
                      <div className="flex items-center gap-3 shrink-0 md:w-[180px]">
                        <time dateTime={post.date} className="text-[13px] md:text-[14px] font-bold tracking-[0.5px] text-brand-brown-sub">
                          {formatDotDate(post.date)}
                        </time>
                        <span className="rounded-full bg-brand-green/60 px-3 py-0.5 text-[11px] font-bold leading-[1.7]">
                          {getTermNames(post, 'category')[0] ?? 'お知らせ'}
                        </span>
                      </div>
                      <span className="text-[15px] md:text-[16px] font-bold leading-[1.7] group-hover:opacity-75">
                        {stripTags(post.title.rendered)}
                      </span>
                    </div>
                    <span aria-hidden="true" className="shrink-0 text-brand-brown-sub transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <ListPagination basePath="/news" current={page} total={totalPages} />
        </section>

        {/* ==================== サイドバー ==================== */}
        <aside className="mt-16 md:mt-0">
          <ArticleSidebar news={[]} features={features.length > 0 ? features.map(toFeatureCard) : FEATURES} />
        </aside>
      </div>

      <div className="border-t border-brand-line">
        <div className="max-w-[1080px] mx-auto px-5 md:px-10 py-4 md:py-5">
          <Breadcrumb items={[{ label: 'TOP', href: '/' }, { label: 'お知らせ' }]} />
        </div>
      </div>
    </main>
  )
}
