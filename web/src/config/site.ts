import type { SiteConfig } from '@/types'

// MYOKOスイーツの設定
export const MYOKO_CONFIG: SiteConfig = {
  tabs: ['sweets', 'tourism', 'model_plan'],
  defaultArea: 'myoko',
  searchRadiusKm: 3,
}

// 将来の横展開（都市エリア）用設定
export const URBAN_CONFIG: SiteConfig = {
  tabs: ['sweets', 'cafe', 'event'],
  defaultArea: 'other',
  searchRadiusKm: 1,
}

// 現在使用する設定
export const SITE_CONFIG = MYOKO_CONFIG

// サイト基本情報
export const SITE_INFO = {
  name: 'MYOKOスイーツ',
  nameEn: 'MYOKO Sweets',
  description: '妙高高原・野尻湖エリアのスイーツ情報サイト',
  descriptionEn: 'Sweets & Cafe guide for Myoko Kogen & Lake Nojiri area',
  url: 'https://myoko-sweets.com',
  cmsUrl: 'https://cms.myoko-sweets.com',
  instagram: 'myoko_sweets',
  twitter: 'myoko_sweets',
  hashtag: '#妙高スイーツ',
}
