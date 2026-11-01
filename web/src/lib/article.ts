import type { WPPost } from '@/types'
import type { FeatureCard } from '@/lib/staticContent'
import { stripTags } from '@/lib/utils'

// 埋め込みのタームから、指定タクソノミーの名前を取り出す（「未分類」は除く）
export function getTermNames(post: WPPost, taxonomy: string): string[] {
  const terms = post._embedded?.['wp:term']?.flat() ?? []
  return terms.filter(t => t.taxonomy === taxonomy && t.slug !== 'uncategorized').map(t => t.name)
}

export function getEyecatch(post: WPPost) {
  return post._embedded?.['wp:featuredmedia']?.[0] ?? null
}

// 特集記事 → TOP・サイドバー用のカード
export function toFeatureCard(post: WPPost): FeatureCard {
  return {
    href:     `/feature/${post.slug}`,
    image:    getEyecatch(post)?.source_url ?? null,
    category: getTermNames(post, 'feature_category')[0] ?? '特集',
    title:    [stripTags(post.title.rendered)],
  }
}
