import type { Metadata } from 'next'
import NewsListView from './NewsListView'

export const metadata: Metadata = {
  title: 'お知らせ',
  description: 'MYOKOスイーツからのお知らせ一覧です。',
}

export default function NewsListPage() {
  return <NewsListView page={1} />
}
