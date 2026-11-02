import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { WPPost } from '@/types'
import { getFeaturePage, getNewsList } from '@/lib/wordpress'
import { stripTags, formatDotDate } from '@/lib/utils'
import { toFeatureCard } from '@/lib/article'
import { Breadcrumb } from '@/components/shop/ShopParts'
import ArticleSidebar from '@/components/article/ArticleSidebar'
import PageBand from '@/components/article/PageBand'
import ListPagination from '@/components/article/ListPagination'

export const metadata: Metadata = {
  title: '特集・コラム',
  description: '妙高高原・野尻湖エリアのスイーツや観光の特集・コラム一覧です。',
}

type Props = { searchParams: Promise<{ page?: string | string[] }> }

function FeatureListCard({ post, large = false }: { post: WPPost; large?: boolean }) {
  const card = toFeatureCard(post)
  const excerpt = stripTags(post.excerpt?.rendered ?? '')
  return (
    <Link href={card.href} className={`group flex flex-col gap-3 ${large ? 'md:flex-row md:items-center md:gap-8' : ''}`}>
      <div className={`relative aspect-[16/10] overflow-hidden rounded-[14px] bg-brand-ivory ${large ? 'md:w-[58%] md:shrink-0' : ''}`}>
        {card.image && (
          <Image
            src={card.image}
            alt=""
            fill
            priority={large}
            sizes={large ? '(max-width: 767px) 100vw, 400px' : '(max-width: 767px) 100vw, 330px'}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[12px] font-bold text-brand-brown-sub">
            <span className="size-[6px] rounded-full bg-brand-green" />
            {card.category}
          </span>
          <time dateTime={post.date} className="text-[12px] font-bold tracking-[0.5px] text-brand-brown-sub">{formatDotDate(post.date)}</time>
        </div>
        <h2 className={`font-bold leading-[1.6] group-hover:opacity-75 ${large ? 'text-[18px] md:text-[22px]' : 'text-[15px] md:text-[16px] line-clamp-2'}`}>
          {card.title.join('')}
        </h2>
        {excerpt && (
          <p className={`text-[13px] leading-[1.8] text-brand-brown-sub ${large ? 'line-clamp-3' : 'line-clamp-2'}`}>{excerpt}</p>
        )}
      </div>
    </Link>
  )
}

export default async function FeatureListPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, Number(typeof pageParam === 'string' ? pageParam : 1) || 1)

  const [{ posts, totalPages }, news] = await Promise.all([
    getFeaturePage(page, 12).catch(() => ({ posts: [], totalPages: 0 })),
    getNewsList(5).catch(() => []),
  ])

  // 1ページ目は最新の1本を大きく見せる
  const [lead, ...rest] = page === 1 ? posts : [undefined, ...posts]

  return (
    <main className="overflow-x-clip pt-16 md:pt-[72px] text-brand-brown-main">
      <PageBand en="Feature" ja="特集・コラム" as="h1" />

      <div className="max-w-[1080px] mx-auto px-5 md:px-10 pt-8 md:pt-12 pb-16 md:pb-24 md:grid md:grid-cols-[1fr_300px] md:gap-12 lg:gap-16">

        {/* ==================== 一覧 ==================== */}
        <section className="min-w-0">
          {posts.length === 0 ? (
            <p className="rounded-[14px] bg-brand-gray px-5 py-16 text-center text-[14px] text-brand-brown-sub">
              特集・コラムはまだありません
            </p>
          ) : (
            <>
              {lead && (
                <div className="border-b border-dashed border-brand-line pb-10 mb-10">
                  <FeatureListCard post={lead} large />
                </div>
              )}
              {rest.length > 0 && (
                <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
                  {rest.map(post => post && <FeatureListCard key={post.id} post={post} />)}
                </div>
              )}
            </>
          )}

          <ListPagination basePath="/feature" current={page} total={totalPages} />
        </section>

        {/* ==================== サイドバー（特集欄は出さない） ==================== */}
        <aside className="mt-16 md:mt-0">
          <ArticleSidebar news={news} features={[]} />
        </aside>
      </div>

      <div className="border-t border-brand-line">
        <div className="max-w-[1080px] mx-auto px-5 md:px-10 py-4 md:py-5">
          <Breadcrumb items={[{ label: 'TOP', href: '/' }, { label: '特集・コラム' }]} />
        </div>
      </div>
    </main>
  )
}
