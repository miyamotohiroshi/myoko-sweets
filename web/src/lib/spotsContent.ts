// 観光スポットページ（グリーンシーズン）の表示内容
// 記事やスポット詳細ができたら href を差し替える

// 楽しみ方で選ぶ（大きいカード）
export const GREEN_STYLES = [
  {
    en:    'Calm',
    lead:  'ゆったり楽しむ',
    title: '観光スポット［ゆったり編］',
    image: '/images/top/enjoy/enjoy-2.jpg',
    href:  '/feature',
  },
  {
    en:    'Active',
    lead:  'アクティブに楽しむ',
    title: '観光スポット［アクティブ編］',
    image: '/images/top/enjoy/enjoy-4.jpg',
    href:  '/feature',
  },
]

// テーマで選ぶ（小さいカード）
export const GREEN_THEMES = [
  { title: '日帰り温泉・足湯',   image: '/images/top/enjoy/enjoy-6.jpg',         href: '/feature' },
  { title: '映える写真スポット', image: '/images/top/enjoy/enjoy-3.jpg',         href: '/feature' },
  { title: 'お土産店情報',       image: '/images/top/feature/feature-1.png',     href: '/feature' },
]

// 旅のお役立ち（丸ボタン）：今は Google マップの周辺検索を開く
const mapSearch = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`妙高高原 ${q}`)}`
export const TRAVEL_LINKS = [
  { label: 'ランチ',     en: 'Lunch', href: mapSearch('ランチ') },
  { label: '宿・ホテル', en: 'Hotel', href: mapSearch('宿 ホテル') },
  { label: 'ツアー',     en: 'Tour',  href: mapSearch('ツアー') },
  { label: 'レンタカー', en: 'Car',   href: mapSearch('レンタカー') },
  { label: 'バス',       en: 'Bus',   href: mapSearch('バス停') },
  { label: 'タクシー',   en: 'Taxi',  href: mapSearch('タクシー') },
]

// 観光マップ（Google マイマップを作ったら URL を差し替える）
export const SPOTS_MAP = {
  embed: 'https://maps.google.com/maps?q=%E5%A6%99%E9%AB%98%E9%AB%98%E5%8E%9F&z=11&output=embed',
  link:  mapSearch('観光スポット'),
}

// 主要エリア（image が null のものは写真を用意したら差し替える）
const place = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`
export const MAIN_AREAS = [
  { access: '妙高高原IC',          name: '赤倉温泉',               text: '妙高山のふもとに広がる温泉街。',                         image: '/images/top/enjoy/enjoy-6.jpg', map: place('赤倉温泉') },
  { access: '妙高高原IC',          name: 'いもり池',               text: '水面に映る「逆さ妙高」が楽しめる池。',                   image: '/images/top/enjoy/enjoy-2.jpg', map: place('いもり池 妙高') },
  { access: '妙高高原IC',          name: '苗名滝',                 text: '日本の滝百選に選ばれた、落差約55mの滝。',               image: '/images/top/enjoy/enjoy-3.jpg', map: place('苗名滝') },
  { access: '妙高高原IC',          name: '笹ヶ峰高原',             text: '標高約1,300mに広がる、牧場と森の高原。',                 image: '/images/top/enjoy/enjoy-5.jpg', map: place('笹ヶ峰高原') },
  { access: '妙高高原IC',          name: '燕温泉',                 text: '野天風呂「黄金の湯」で知られる山あいの温泉。',           image: null, map: place('燕温泉') },
  { access: '信濃町IC',            name: '野尻湖',                 text: '遊覧船やSUPが楽しめる、ナウマンゾウの化石でも有名な湖。', image: '/images/top/enjoy/enjoy-4.jpg', map: place('野尻湖') },
  { access: '信濃町IC',            name: 'タングラム斑尾',         text: '野尻湖を見下ろす「野尻湖テラス」がある高原リゾート。',   image: null, map: place('タングラム斑尾') },
  { access: '信濃町IC',            name: '戸隠',                   text: '戸隠神社と奥社の杉並木で知られる信仰の地。',             image: null, map: place('戸隠神社') },
  { access: '中郷IC・新井IC',      name: 'ロッテアライリゾート',   text: '自然の中のアクティビティが充実したリゾート。',           image: null, map: place('ロッテアライリゾート') },
  { access: '北陸新幹線',          name: '上越妙高駅',             text: '新幹線で妙高エリアへ向かうときの玄関口。',               image: null, map: place('上越妙高駅') },
]

// ============================================================
// ウィンターシーズン
// ============================================================

// 冬の楽しみ方（大きいカード）。image が null のものは写真を用意したら差し替える
export const WINTER_FEATURES = [
  { title: '妙高周辺のスキー場をまとめて紹介', image: '/images/top/enjoy/enjoy-1.jpg', href: '/feature' },
  { title: '帰りに寄れる日帰り温泉',           image: '/images/top/enjoy/enjoy-6.jpg', href: '/feature' },
  { title: 'ナイターも楽しめるスキー場',       image: null,                            href: '/feature' },
]

// 冬のお役立ち（小さいカード）
export const WINTER_TIPS = [
  { title: 'レンタル比較', sub: 'スキー・スノボ・ウェア',     image: null, href: '/feature' },
  { title: 'お土産店',     sub: '',                           image: null, href: '/feature' },
  { title: 'スキー・スノボ以外の雪の楽しみ方', sub: '',       image: null, href: '/feature' },
  { title: 'ゴーグル・手袋・帽子', sub: '現地で買える場所',   image: null, href: '/feature' },
]

// スキー場（tags は掲載予定の情報。詳細ページができたら各タグからリンクする）
export const SKI_TAGS = ['コース', 'ランチ', 'スイーツ', 'レンタル', 'ツアー']
export const SKI_RESORTS_FEATURED = [
  { name: '妙高杉ノ原スキー場',   text: '最長8.5kmのロングコースが楽しめるスキー場。', image: null, map: place('妙高杉ノ原スキー場') },
  { name: '池の平温泉スキー場',   text: '初心者から中級者まで楽しめるスキー場。',       image: null, map: place('池の平温泉スキー場') },
]
export const SKI_RESORTS_MORE = [
  { name: '赤倉温泉スキー場',       map: place('赤倉温泉スキー場') },
  { name: 'タングラムスキーサーカス', map: place('タングラムスキーサーカス') },
  { name: '斑尾高原スキー場',       map: place('斑尾高原スキー場') },
  { name: 'ロッテアライリゾート',   map: place('ロッテアライリゾート') },
  { name: '黒姫高原スノーパーク',   map: place('黒姫高原スノーパーク') },
  { name: '戸隠スキー場',           map: place('戸隠スキー場') },
  { name: '関温泉スキー場',         map: place('関温泉スキー場') },
]

// スキー場マップ
export const SKI_MAP = {
  embed: `https://maps.google.com/maps?q=${encodeURIComponent('妙高 スキー場')}&z=11&output=embed`,
  link:  place('妙高 スキー場'),
}
