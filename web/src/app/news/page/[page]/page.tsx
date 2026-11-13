import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { orPlaceholder, EMPTY_PARAM } from '@/lib/utils'
import { getNewsPage } from '@/lib/wordpress'
import NewsListView from '../../NewsListView'

type Props = { params: Promise<{ page: string }> }

// 静的書き出しのため、ビルド時にある2ページ目以降だけを作る（1ページ目は /news/）
export const dynamicParams = false

export async function generateStaticParams() {
  const { totalPages } = await getNewsPage(1, 10).catch(() => ({ totalPages: 0 }))
  return orPlaceholder(Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({ page: String(i + 2) })), 'page')
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { page } = await params
  return { title: `お知らせ（${page}ページ目）` }
}

export default async function NewsListPagedPage({ params }: Props) {
  const { page } = await params
  if (page === EMPTY_PARAM) notFound()
  return <NewsListView page={Number(page)} />
}
