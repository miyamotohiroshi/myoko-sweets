'use client'

import { useState } from 'react'

/** ハッシュタグ表示 ＋「タグをコピー」ボタン */
export default function HashtagCopy({ tags }: { tags: string[] }) {
  const [copied, setCopied] = useState(false)
  const text = tags.join(' ')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // クリップボード非対応の環境では何もしない
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="flex flex-wrap justify-center gap-x-3 gap-y-1 bg-white border border-brand-line rounded-full px-6 py-2 text-[15px] font-bold tracking-[0.32px]">
        {tags.map(tag => <span key={tag}>{tag}</span>)}
      </p>
      <button
        type="button"
        onClick={copy}
        className="h-11 w-[180px] rounded-full bg-brand-brown-sub text-[14px] font-bold tracking-[0.32px] text-white transition-opacity hover:opacity-85"
      >
        {copied ? 'コピーしました！' : 'タグをコピー'}
      </button>
    </div>
  )
}
