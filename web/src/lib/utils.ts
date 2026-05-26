// クラス名を結合するユーティリティ
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

// 日付をフォーマット
export function formatDate(dateString: string, locale: string = 'ja-JP'): string {
  return new Date(dateString).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
