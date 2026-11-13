import type { Metadata } from 'next'
import FeatureListView from './FeatureListView'

export const metadata: Metadata = {
  title: '特集・コラム',
  description: '妙高高原・野尻湖エリアのスイーツや観光の特集・コラム一覧です。',
}

export default function FeatureListPage() {
  return <FeatureListView page={1} />
}
