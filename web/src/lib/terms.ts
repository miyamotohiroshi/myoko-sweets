// WordPress タクソノミーターム ID → 表示名マップ（静的定義）

export const SWEETS_CATEGORY_MAP: Record<number, string> = {
  6:  'ケーキ',
  7:  'クレープ',
  8:  'ソフトクリーム',
  9:  'プリン',
  10: 'パフェ',
  11: 'ジェラート・アイス',
  12: '焼き菓子',
  13: '和菓子',
  14: '地元食材スイーツ',
  15: 'シュークリーム',
  16: 'かき氷',
  17: 'パンケーキ・ワッフル',
  46: 'タルト・パイ',
  47: 'ゼリー',
}

// スイーツカテゴリの表示順（絞り込み・「スイーツでお店を探す」）
export const SWEETS_CATEGORY_ORDER: number[] = [6, 46, 12, 15, 9, 47, 17, 7, 10, 8, 11, 16, 13, 14]

// スイーツカテゴリ term ID → アイコン（public/images/sweets/{slug}.svg）
export const SWEETS_ICON_MAP: Record<number, string> = {
  6:  'cake',
  7:  'crepe',
  8:  'ice',  // ソフトクリーム
  9:  'pudding',
  10: 'parfait',
  11: 'gelato',
  12: 'cookie',
  13: 'wagashi',
  14: 'local',
  15: 'cream_puff',
  16: 'kakigori',
  17: 'pancake',
  46: 'tart_pie',
  47: 'jelly',
}

export const SHOP_TYPE_MAP: Record<number, string> = {
  2: 'スイーツ店',
  3: 'カフェ',
  4: 'レストラン',
  5: 'お土産屋',
}

// ドリンクカテゴリ term ID → 店舗カードのアイコン
export const DRINK_ICON_MAP: Record<number, 'coffee' | 'tea' | 'beer'> = {
  18: 'coffee',
  19: 'tea',
  20: 'tea',
  21: 'beer',
}

// 観光スポットのカテゴリ（spot_category）
export const SPOT_CATEGORY_MAP: Record<number, string> = {
  35: '神社・寺',
  36: '温泉',
  37: '自然・景勝地',
  38: 'スキー場',
  39: '体験・アクティビティ',
  40: 'ショッピング',
  41: 'その他',
}

export const AREA_MAP: Record<number, string> = {
  25: '妙高高原',
  26: '野尻湖',
  27: '新井・中郷',
  28: 'その他',
}

export const FEATURES_MAP: Record<number, string> = {
  29: '席あり',
  30: '持ち帰りあり',
  31: '持ち帰りのみ',
  32: '食事あり',
  33: 'Wi-Fiあり',
  34: '電源あり',
  45: 'ペット同伴可',
}

// フィルターラベル → term ID（タブ内フィルター用）
export const SWEETS_FILTER_MAP: Record<string, number> = {
  'ケーキ':       6,
  'プリン':       9,
  'クレープ':     7,
  'ソフトクリーム': 8,
  'ジェラート・アイス': 11,
  'シュークリーム': 15,
  '和菓子':      13,
  'かき氷':      16,
  'パンケーキ・ワッフル': 17,
  'タルト・パイ': 46,
  '焼き菓子':    12,
  'ゼリー':      47,
}

export const TYPE_FILTER_MAP: Record<string, number[]> = {
  '座席あり':   [29],
  '持ち帰り':   [30, 31],  // 持ち帰りあり OR 持ち帰りのみ
  '電源席あり': [34],
  'ペット同伴可': [45],
}

export const AREA_FILTER_MAP: Record<string, number> = {
  '妙高高原':   25,
  '野尻湖':     26,
  '新井・中郷': 27,
}
