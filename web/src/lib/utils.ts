import { type ClassValue, clsx } from 'clsx'

// Tailwindクラスのマージ
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

// 日付フォーマット
export function formatDate(dateString: string, locale: string = 'ja-JP'): string {
  return new Date(dateString).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// 日付を「2026.1.1」形式にする（お知らせ用）
export function formatDotDate(dateString: string): string {
  const d = new Date(dateString)
  return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`
}

// 現在の月を取得（1〜12）
export function getCurrentMonth(): number {
  return new Date().getMonth() + 1
}

// 営業月の表示テキストを生成
export function formatOperatingMonths(months: string[]): string {
  if (months.length === 12) return '通年営業'
  if (months.length === 0) return '要確認'
  const sorted = [...months].map(Number).sort((a, b) => a - b)
  return sorted.map(m => `${m}月`).join('・')
}

// シーズン表示テキスト
export function formatSeason(season: string): string {
  const map: Record<string, string> = {
    all_year: '通年営業',
    year_round: '通年営業',
    winter_only: '冬季のみ',
    green_only: 'グリーンシーズンのみ',
    limited: '期間限定',
  }
  return map[season] ?? season
}

// HTMLをサニタイズして返す（XSS対策）
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
}

// HTMLタグを除去してプレーンテキストにする（カード表示用）
export function stripTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .trim()
}

// メニューHTML（<li><span class="menu-title">…</span><span class="menu-price">…</span></li>）を項目に分解
export function parseMenuHtml(html: string): { name: string; price: string }[] {
  if (!html) return []
  const items: { name: string; price: string }[] = []
  for (const li of html.match(/<li[^>]*>[\s\S]*?<\/li>/gi) ?? []) {
    const name  = stripTags(li.match(/class="menu-title"[^>]*>([\s\S]*?)<\/span>/i)?.[1] ?? li)
    const price = stripTags(li.match(/class="menu-price"[^>]*>([\s\S]*?)<\/span>/i)?.[1] ?? '')
    if (!name || name === 'なし') continue
    items.push({ name, price: price === '-' ? '' : price })
  }
  return items
}

// <li> のリストをテキスト配列にする（口コミサマリー用）
export function parseListHtml(html: string): string[] {
  if (!html) return []
  const items = (html.match(/<li[^>]*>[\s\S]*?<\/li>/gi) ?? []).map(stripTags).filter(Boolean)
  return items.length ? items : stripTags(html).split('\n').map(s => s.trim()).filter(Boolean)
}

// 支払い方法の表示名
export const PAYMENT_LABELS: Record<string, string> = {
  cash:       '現金',
  credit:     'クレジットカード',
  ic:         '交通系IC',
  qr:         'QRコード決済',
  qr_payment: 'QRコード決済',
}

// 記事本文の h2 に id を振り、目次を作る
export function buildToc(html: string): { html: string; toc: { id: string; text: string }[] } {
  const toc: { id: string; text: string }[] = []
  const withIds = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (_, attrs: string, inner: string) => {
    const id = `section-${toc.length + 1}`
    toc.push({ id, text: stripTags(inner) })
    const cleaned = attrs.replace(/\sid="[^"]*"/i, '')
    return `<h2${cleaned} id="${id}">${inner}</h2>`
  })
  return { html: withIds, toc }
}
