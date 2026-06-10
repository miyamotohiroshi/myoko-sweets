import {
  Cake,
  IceCream,
  Coffee,
  Leaf,
  Cookie,
  GlassWater,
  UtensilsCrossed,
  Snowflake,
} from 'lucide-react'

// スイーツカテゴリのアイコン定義
// ※ オリジナルSVGに差し替える際はここを修正するだけでOK
export const SWEETS_ICONS: Record<string, {
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
  labelEn: string
}> = {
  cake:       { icon: Cake,            label: 'ケーキ',           labelEn: 'Cake' },
  crepe:      { icon: UtensilsCrossed, label: 'クレープ',         labelEn: 'Crepe' },
  ice:        { icon: IceCream,        label: 'アイス',           labelEn: 'Ice Cream' },
  pudding:    { icon: Coffee,          label: 'プリン',           labelEn: 'Pudding' },
  parfait:    { icon: GlassWater,      label: 'パフェ',           labelEn: 'Parfait' },
  gelato:     { icon: IceCream,        label: 'ジェラート',       labelEn: 'Gelato' },
  cookie:     { icon: Cookie,          label: 'クッキー',         labelEn: 'Cookie' },
  wagashi:    { icon: Leaf,            label: '和菓子',           labelEn: 'Wagashi' },
  local:      { icon: Leaf,            label: '地元食材スイーツ', labelEn: 'Local Sweets' },
  kakigori:   { icon: Snowflake,       label: 'かき氷',           labelEn: 'Shaved Ice' },
  cream_puff: { icon: Coffee,          label: 'シュークリーム',   labelEn: 'Cream Puff' },
  pancake:    { icon: Cake,            label: 'パンケーキ',       labelEn: 'Pancake' },
}

// アイコンコンポーネント
type SweetsIconProps = {
  category: string
  size?: number
  className?: string
  showLabel?: boolean
  locale?: 'ja' | 'en'
}

export function SweetsIcon({
  category,
  size = 24,
  className = '',
  showLabel = false,
  locale = 'ja',
}: SweetsIconProps) {
  const iconData = SWEETS_ICONS[category]
  if (!iconData) return null

  const Icon = iconData.icon
  const label = locale === 'en' ? iconData.labelEn : iconData.label

  if (showLabel) {
    return (
      <div className="flex flex-col items-center gap-1">
        <Icon size={size} className={className} />
        <span className="text-xs">{label}</span>
      </div>
    )
  }

  return <Icon size={size} className={className} aria-label={label} />
}

// カテゴリのラベルだけ取得するユーティリティ
export function getSweetsCategoryLabel(
  category: string,
  locale: 'ja' | 'en' = 'ja'
): string {
  const iconData = SWEETS_ICONS[category]
  if (!iconData) return category
  return locale === 'en' ? iconData.labelEn : iconData.label
}
