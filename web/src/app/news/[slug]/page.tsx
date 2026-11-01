import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { WPPost } from '@/types'
import { getNewsBySlug, getNewsList } from '@/lib/wordpress'
import { SITE_INFO } from '@/config/site'
import { stripTags, sanitizeHtml, formatDotDate } from '@/lib/utils'
import { Breadcrumb } from '@/components/shop/ShopParts'
import ArticleSidebar from '@/components/article/ArticleSidebar'
import ShareButtons from '@/components/article/ShareButtons'
import { getTermNames, getEyecatch } from '@/lib/article'

type Props = { params: Promise<{ slug: string }> }

// ============================================================
// データ取得
// ============================================================
async function loadPost(slug: string): Promise<WPPost | null> {
  try {
    return await getNewsBySlug(decodeURIComponent(slug))
  } catch {
    return null
  }
}

async function loadList(): Promise<WPPost[]> {
  try {
    return await getNewsList(20)
  } catch {
    return []
  }
}


// ============================================================
// メタデータ
// ============================================================
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await loadPost(slug)
  if (!post) return { title: 'お知らせが見つかりません' }
  const title = stripTags(post.title.rendered)
  const description = stripTags(post.excerpt?.rendered ?? '').slice(0, 120)
  const image = getEyecatch(post)?.source_url
  return {
    title,
    description,
    openGraph: { title, description, type: 'article', images: image ? [image] : undefined },
  }
}

// ============================================================
// パーツ
// ============================================================
function PagerLink({ post, dir }: { post?: WPPost; dir: 'prev' | 'next' }) {
  if (!post) return <span className="hidden md:block" />
  const isPrev = dir === 'prev'
  return (
    <Link
      href={`/news/${post.slug}`}
      className={`group flex flex-col gap-1 rounded-[12px] bg-brand-gray px-5 py-4 transition-colors hover:bg-brand-ivory ${isPrev ? 'md:items-start' : 'md:items-end md:text-right'}`}
    >
      <span className="flex items-center gap-1 font-klee font-semibold text-[13px] tracking-[1px] text-brand-brown-sub">
        {isPrev && <span className="transition-transform group-hover:-translate-x-0.5">←</span>}
        {isPrev ? 'PREV' : 'NEXT'}
        {!isPrev && <span className="transition-transform group-hover:translate-x-0.5">→</span>}
      </span>
      <span className="line-clamp-2 text-[14px] font-bold leading-[1.6]">{stripTags(post.title.rendered)}</span>
    </Link>
  )
}

// ============================================================
// ページ
// ============================================================
export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params
  const [post, list] = await Promise.all([loadPost(slug), loadList()])
  if (!post) notFound()

  const title    = stripTags(post.title.rendered)
  const category = getTermNames(post, 'category')[0] ?? 'お知らせ'
  const content  = sanitizeHtml(post.content.rendered)
  const eyecatch = getEyecatch(post)
  const url      = `${SITE_INFO.url}/news/${post.slug}`

  // 一覧は新しい順：前の記事＝ひとつ古い記事、次の記事＝ひとつ新しい記事
  const index = list.findIndex(p => p.id === post.id)
  const older = index >= 0 ? list[index + 1] : undefined
  const newer = index > 0 ? list[index - 1] : undefined

  return (
    <main className="overflow-x-clip pt-16 md:pt-[72px] text-brand-brown-main">

      {/* ==================== ページ見出し ==================== */}
      <div className="border-b border-brand-line bg-brand-store-bg">
        <div className="max-w-[1080px] mx-auto px-5 md:px-10 py-6 md:py-8 flex items-end gap-3">
          <p className="font-klee font-semibold text-[30px] md:text-[36px] leading-none tracking-[0.5px] [-webkit-text-stroke:0.6px_currentColor]">News</p>
          <p className="text-[13px] md:text-[14px] font-bold text-brand-brown-sub">お知らせ</p>
        </div>
      </div>

      <div className="max-w-[1080px] mx-auto px-5 md:px-10 pt-8 md:pt-12 pb-16 md:pb-24 md:grid md:grid-cols-[1fr_300px] md:gap-12 lg:gap-16">

        {/* ==================== 記事 ==================== */}
        <article className="min-w-0">
          <header>
            <div className="flex items-center gap-3">
              <time dateTime={post.date} className="text-[13px] md:text-[14px] font-bold tracking-[0.5px] text-brand-brown-sub">
                {formatDotDate(post.date)}
              </time>
              <span className="rounded-full bg-brand-green/60 px-3 py-0.5 text-[11px] md:text-[12px] font-bold leading-[1.7]">{category}</span>
            </div>
            <h1 className="mt-3 text-[22px] md:text-[28px] font-bold leading-[1.6] tracking-[0.32px]">{title}</h1>
            <div className="mt-5 flex items-center justify-between border-b border-dashed border-brand-line pb-5">
              <span className="text-[12px] text-brand-brown-sub">
                {post.modified.slice(0, 10) !== post.date.slice(0, 10) && <>更新：{formatDotDate(post.modified)}</>}
              </span>
              <ShareButtons title={title} url={url} />
            </div>
          </header>

          {eyecatch && (
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[14px] bg-brand-ivory">
              <Image src={eyecatch.source_url} alt={eyecatch.alt_text || title} fill priority sizes="(max-width: 767px) 100vw, 680px" className="object-cover" />
            </div>
          )}

          <div className="article-body mt-8" dangerouslySetInnerHTML={{ __html: content }} />

          {/* 記事の下：シェア → 前後の記事 → 一覧へ */}
          <div className="mt-12 flex justify-end border-t border-dashed border-brand-line pt-5">
            <ShareButtons title={title} url={url} />
          </div>

          {(older || newer) && (
            <nav aria-label="前後のお知らせ" className="mt-8 grid gap-3 md:grid-cols-2">
              <PagerLink post={older} dir="prev" />
              <PagerLink post={newer} dir="next" />
            </nav>
          )}

          <div className="mt-10 flex justify-center">
            <Link
              href="/#news"
              className="relative flex items-center justify-center h-12 w-[220px] rounded-full border border-brand-beige bg-white text-[14px] font-bold tracking-[0.32px] transition-colors hover:bg-brand-ivory"
            >
              お知らせ一覧へ
              <Image src="/images/top/icons/arrow-brown.svg" alt="" width={16} height={16} className="absolute right-5" />
            </Link>
          </div>
        </article>

        {/* ==================== サイドバー ==================== */}
        <aside className="mt-16 md:mt-0">
          <ArticleSidebar news={list} currentSlug={post.slug} />
        </aside>
      </div>

      {/* ==================== パンくず（ページ最下部） ==================== */}
      <div className="border-t border-brand-line">
        <div className="max-w-[1080px] mx-auto px-5 md:px-10 py-4 md:py-5">
          <Breadcrumb
            items={[
              { label: 'TOP', href: '/' },
              { label: 'お知らせ', href: '/#news' },
              { label: title },
            ]}
          />
        </div>
      </div>
    </main>
  )
}
