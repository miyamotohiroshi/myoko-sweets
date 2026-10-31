// WordPress タクソノミーターム ID → 表示名マップ（静的定義）

export const SWEETS_CATEGORY_MAP: Record<number, string> = {
  6:  'ケーキ',
  7:  'クレープ',
  8:  'アイス',
  9:  'プリン',
  10: 'パフェ',
  11: 'ジェラート',
  12: 'クッキー',
  13: '和菓子',
  14: '地元食材スイーツ',
  15: 'シュークリーム',
  16: 'かき氷',
  17: 'パンケーキ',
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
}

// フィルターラベル → term ID（タブ内フィルター用）
export const SWEETS_FILTER_MAP: Record<string, number> = {
  'ケーキ':       6,
  'プリン':       9,
  'クレープ':     7,
  'アイス':       8,
  'シュークリーム': 15,
  '和菓子':      13,
  'かき氷':      16,
  'パンケーキ':  17,
}

export const TYPE_FILTER_MAP: Record<string, number[]> = {
  '座席あり':   [29],
  '持ち帰り':   [30, 31],  // 持ち帰りあり OR 持ち帰りのみ
  '電源席あり': [34],
}

export const AREA_FILTER_MAP: Record<string, number> = {
  '妙高高原':   25,
  '野尻湖':     26,
  '新井・中郷': 27,
}
