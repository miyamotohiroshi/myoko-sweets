import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { WPPost } from '@/types'
import { getFeatureBySlug, getFeatureList, getNewsList } from '@/lib/wordpress'
import { SITE_INFO } from '@/config/site'
import { FEATURES } from '@/lib/staticContent'
import { stripTags, sanitizeHtml, formatDotDate, buildToc } from '@/lib/utils'
import { getTermNames, getEyecatch, toFeatureCard } from '@/lib/article'
import { Breadcrumb } from '@/components/shop/ShopParts'
import ArticleSidebar from '@/components/article/ArticleSidebar'
import PageBand from '@/components/article/PageBand'
import ShareButtons from '@/components/article/ShareButtons'

type Props = { params: Promise<{ slug: string }> }

// ============================================================
// データ取得
// ============================================================
async function loadPost(slug: string): Promise<WPPost | null> {
  try {
    return await getFeatureBySlug(decodeURIComponent(slug))
  } catch {
    return null
  }
}

async function safe<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try {
    return await fn()
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
  if (!post) return { title: '特集記事が見つかりません' }
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
function Toc({ items }: { items: { id: string; text: string }[] }) {
  return (
    <nav aria-label="目次" className="mt-8 rounded-[14px] bg-brand-store-bg px-6 md:px-8 py-6">
      <p className="flex items-baseline gap-2">
        <span className="font-klee font-semibold text-[18px] leading-none tracking-[1px] [-webkit-text-stroke:0.4px_currentColor]">CONTENTS</span>
        <span className="text-[12px] font-bold text-brand-brown-sub">目次</span>
      </p>
      <ol className="mt-4 flex flex-col gap-2.5">
        {items.map((item, i) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="group flex items-start gap-3 text-[14px] md:text-[15px] font-bold leading-[1.6]">
              <span className="mt-[1px] font-klee text-[14px] text-brand-brown-sub tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <span className="underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-brand-green">{item.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

function AuthorBox() {
  return (
    <section className="mt-12 flex items-start gap-4 rounded-[14px] border border-brand-line px-5 md:px-6 py-5">
      <div className="grid size-14 shrink-0 place-items-center rounded-full bg-brand-store-bg">
        <Image src="/images/sweets/cake.svg" alt="" width={36} height={36} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[11px] font-bold tracking-[0.5px] text-brand-brown-sub">この記事を書いた人</p>
        <p className="text-[15px] font-bold">{SITE_INFO.name} 編集部</p>
        <p className="text-[13px] leading-[1.8] text-brand-brown-sub">
          妙高高原・野尻湖エリアのおすすめスイーツや観光スポットを、スイーツ好きの地元民が案内しています。
        </p>
      </div>
    </section>
  )
}

function RelatedCard({ post }: { post: WPPost }) {
  const card = toFeatureCard(post)
  return (
    <Link href={card.href} className="group flex flex-col gap-2">
      <div className="relative aspect-[16/10] overflow-hidden rounded-[12px] bg-brand-ivory">
        {card.image && <Image src={card.image} alt="" fill sizes="(max-width: 767px) 100vw, 330px" className="object-cover transition-transform duration-500 group-hover:scale-105" />}
      </div>
      <span className="flex items-center gap-1.5 text-[12px] font-bold text-brand-brown-sub">
        <span className="size-[6px] rounded-full bg-brand-green" />
        {card.category}
      </span>
      <span className="line-clamp-2 text-[14px] md:text-[15px] font-bold leading-[1.6] group-hover:opacity-75">{card.title.join('')}</span>
    </Link>
  )
}

// ============================================================
// ページ
// ============================================================
export default async function FeatureDetailPage({ params }: Props) {
  const { slug } = await params
  const [post, features, news] = await Promise.all([
    loadPost(slug),
    safe(() => getFeatureList(20)),
    safe(() => getNewsList(5)),
  ])
  if (!post) notFound()

  const title      = stripTags(post.title.rendered)
  const categories = getTermNames(post, 'feature_category')
  const lead       = stripTags(post.excerpt?.rendered ?? '')
  const eyecatch   = getEyecatch(post)
  const { html, toc } = buildToc(sanitizeHtml(post.content.rendered))
  const url        = `${SITE_INFO.url}/feature/${post.slug}`
  const related    = features.filter(f => f.id !== post.id).slice(0, 4)
  const sideCards  = related.length > 0 ? related.map(toFeatureCard) : FEATURES

  return (
    <main className="overflow-x-clip pt-16 md:pt-[72px] text-brand-brown-main">

      {/* ==================== ページ見出し ==================== */}
      <PageBand en="Feature" ja="特集・コラム" />

      <div className="max-w-[1080px] mx-auto px-5 md:px-10 pt-8 md:pt-12 pb-16 md:pb-24 md:grid md:grid-cols-[1fr_300px] md:gap-12 lg:gap-16">

        {/* ==================== 記事 ==================== */}
        <article className="min-w-0">
          <header>
            <div className="flex flex-wrap items-center gap-2">
              {(categories.length > 0 ? categories : ['特集']).map(name => (
                <span key={name} className="rounded-full bg-brand-green/60 px-3 py-0.5 text-[11px] md:text-[12px] font-bold leading-[1.7]">{name}</span>
              ))}
              <time dateTime={post.date} className="ml-1 text-[13px] font-bold tracking-[0.5px] text-brand-brown-sub">{formatDotDate(post.date)}</time>
            </div>
            <h1 className="mt-3 text-[24px] md:text-[32px] font-bold leading-[1.55] tracking-[0.32px]">{title}</h1>
            {lead && <p className="mt-4 text-[14px] md:text-[15px] leading-[1.9] text-brand-brown-sub">{lead}</p>}
            <div className="mt-5 flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
              <span className="flex flex-wrap gap-x-4 text-[12px] text-brand-brown-sub">
                <span>文：{SITE_INFO.name} 編集部</span>
                {post.modified.slice(0, 10) !== post.date.slice(0, 10) && <span>更新：{formatDotDate(post.modified)}</span>}
              </span>
              <ShareButtons title={title} url={url} />
            </div>
          </header>

          {eyecatch && (
            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-[16px] bg-brand-ivory -mx-5 md:mx-0 max-md:rounded-none">
              <Image src={eyecatch.source_url} alt={eyecatch.alt_text || title} fill priority sizes="(max-width: 767px) 100vw, 680px" className="object-cover" />
            </div>
          )}

          {toc.length >= 2 && <Toc items={toc} />}

          <div className="article-body mt-10 [&_h2]:scroll-mt-[88px] md:[&_h2]:scroll-mt-[96px]" dangerouslySetInnerHTML={{ __html: html }} />

          <div className="mt-12 flex justify-end border-t border-dashed border-brand-line pt-5">
            <ShareButtons title={title} url={url} />
          </div>

          <AuthorBox />

          {/* あわせて読みたい */}
          {related.length > 0 && (
            <section className="mt-14">
              <h2 className="flex items-baseline gap-2">
                <span className="font-klee font-semibold text-[24px] md:text-[28px] leading-none [-webkit-text-stroke:0.6px_currentColor]">Related</span>
                <span className="text-[13px] font-bold text-brand-brown-sub">あわせて読みたい</span>
              </h2>
              <div className="mt-5 grid gap-6 sm:grid-cols-2">
                {related.map(p => <RelatedCard key={p.id} post={p} />)}
              </div>
            </section>
          )}

          <div className="mt-12 flex justify-center">
            <Link
              href="/feature"
              className="relative flex items-center justify-center h-12 w-[220px] rounded-full border border-brand-beige bg-white text-[14px] font-bold tracking-[0.32px] transition-colors hover:bg-brand-ivory"
            >
              特集・コラム一覧へ
              <Image src="/images/top/icons/arrow-brown.svg" alt="" width={16} height={16} className="absolute right-5" />
            </Link>
          </div>
        </article>

        {/* ==================== サイドバー ==================== */}
        <aside className="mt-16 md:mt-0">
          <ArticleSidebar news={news} features={sideCards} />
        </aside>
      </div>

      {/* ==================== パンくず（ページ最下部） ==================== */}
      <div className="border-t border-brand-line">
        <div className="max-w-[1080px] mx-auto px-5 md:px-10 py-4 md:py-5">
          <Breadcrumb
            items={[
              { label: 'TOP', href: '/' },
              { label: '特集・コラム', href: '/feature' },
              { label: title },
            ]}
          />
        </div>
      </div>
    </main>
  )
}
