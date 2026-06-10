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
