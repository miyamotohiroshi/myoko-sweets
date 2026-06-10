// ============================================
// 共通Tailwindクラス定数
// コンポーネントで import { containerCx } from '@/components/ui' として使用
// ============================================

// コンテナ（コンテンツ最大幅・中央揃え）
export const containerCx =
  'w-full max-w-content mx-auto px-5 md:px-5'

// セクション共通パディング
export const sectionCx =
  'py-[80px] md:py-[48px]'

// セクション見出し（英語）
export const sectionTitleEnCx =
  'text-[1.75rem] md:text-[1.375rem] font-bold text-brand-brownMain tracking-wide'

// セクション見出し（日本語サブ）
export const sectionTitleJaCx =
  'text-[0.8125rem] text-brand-brownSub tracking-wider'

// タグ（フィルター・カテゴリ）
export const tagCx =
  'inline-flex items-center px-3 py-0.5 rounded-full text-xs border border-brand-beige text-brand-brownSub bg-white whitespace-nowrap transition-colors duration-200'

// タグ（選択中）
export const tagActiveCx =
  'inline-flex items-center px-3 py-0.5 rounded-full text-xs bg-brand-brownMain text-white border border-brand-brownMain whitespace-nowrap'

// タグ（グリーン）
export const tagGreenCx =
  'inline-flex items-center px-3 py-0.5 rounded-full text-xs bg-brand-green text-white border border-brand-green whitespace-nowrap'

// プライマリボタン
export const btnPrimaryCx =
  'inline-flex items-center justify-center gap-1.5 px-6 py-2.5 bg-brand-brownMain text-brand-ivory rounded text-sm tracking-wider transition-colors duration-200 hover:bg-brand-brownSub cursor-pointer border-none'

// アウトラインボタン
export const btnOutlineCx =
  'inline-flex items-center justify-center gap-1.5 px-6 py-2.5 bg-transparent text-brand-brownMain rounded text-sm tracking-wider border border-brand-beige transition-colors duration-200 hover:bg-brand-ivory cursor-pointer'

// GoogleMapボタン
export const btnMapCx =
  'inline-flex items-center gap-1.5 px-4 py-2 bg-white text-brand-brownSub rounded text-[0.8125rem] border border-brand-beige transition-colors duration-200 hover:bg-brand-ivory cursor-pointer'

// カード共通
export const cardCx =
  'bg-white border border-brand-beige rounded-lg overflow-hidden transition-colors duration-200'

// 区切り線
export const dividerCx =
  'w-full border-t border-brand-beige'

export { SweetsIcon, SWEETS_ICONS, getSweetsCategoryLabel } from './SweetsIcon'
