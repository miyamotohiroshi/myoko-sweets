'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { ReviewList } from './ShopParts'

type TabId = 'summary' | 'x'

const TABS: { id: TabId; label: string }[] = [
  { id: 'summary', label: 'サマリー' },
  { id: 'x',       label: 'X post' },
]

// X の埋め込みスクリプト（widgets.js）
type Twttr = { widgets: { load: (el?: HTMLElement) => void } }
const loadWidgets = () => (window as unknown as { twttr?: Twttr }).twttr?.widgets.load()

/** レビュー：口コミサマリーと X の投稿ピックアップをタブで切り替え */
export default function ShopReview({ summary, xPosts, hashtags }: { summary: string[]; xPosts: string[]; hashtags: string[] }) {
  const [tab, setTab] = useState<TabId>(summary.length > 0 ? 'summary' : 'x')
  // X の投稿は一度開いたら DOM に残し、タブを戻しても読み込み直さない
  const [xOpened, setXOpened] = useState(tab === 'x')

  // 初めて X タブを開いて投稿が DOM に出たら、埋め込みに変換する
  useEffect(() => {
    if (xOpened) loadWidgets()
  }, [xOpened])

  return (
    <div>
      <div role="tablist" aria-label="レビューの表示切り替え" className="flex mx-auto md:mx-0 w-full max-w-[320px] rounded-full border border-brand-line bg-white p-1">
        {TABS.map(t => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setTab(t.id)
                if (t.id === 'x') setXOpened(true)
              }}
              className={`flex-1 h-10 rounded-full text-[14px] font-bold tracking-[0.32px] transition-colors ${active ? 'bg-brand-green text-brand-brown-main' : 'text-brand-brown-sub hover:bg-brand-ivory'}`}
            >
              {t.label}
            </button>
          )
        })}
      </div>

      <div role="tabpanel" className="mt-5">
        {tab === 'summary' && (
          summary.length > 0 ? (
            <div className="rounded-[14px] bg-brand-gray px-5 md:px-8 py-6">
              <ReviewList items={summary} />
            </div>
          ) : (
            <p className="rounded-[14px] bg-brand-gray px-5 py-8 text-center text-[14px] text-brand-brown-sub">口コミのまとめは準備中です</p>
          )
        )}

        {xOpened && (
          <div hidden={tab !== 'x'}>
            {xPosts.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 md:items-start">
                {xPosts.map(url => (
                  // widgets.js が blockquote を投稿カードに置き換える（読み込み前はリンクとして表示）
                  <div key={url}>
                    <blockquote className="twitter-tweet flex flex-col gap-2 rounded-[12px] border border-brand-line bg-white px-5 py-6 text-[13px] text-brand-brown-sub" data-lang="ja" data-dnt="true">
                      <span>X の投稿を読み込み中…</span>
                      <a href={url.replace('://x.com/', '://twitter.com/')} target="_blank" rel="noopener noreferrer" className="underline break-all">{url}</a>
                    </blockquote>
                  </div>
                ))}
              </div>
            ) : (
              <p className="rounded-[14px] bg-brand-gray px-5 py-8 text-center text-[14px] leading-[1.8] text-brand-brown-sub">
                まだピックアップした投稿はありません。<br />
                {hashtags.join(' ')} を付けて投稿してね！
              </p>
            )}
            <p className="mt-4 text-center text-[13px] leading-[1.8] text-brand-brown-sub">
              {hashtags.join(' ')} のタグが入った投稿から<br className="md:hidden" />ピックアップして表示しています
            </p>
          </div>
        )}
      </div>

      {xPosts.length > 0 && (
        <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" onLoad={loadWidgets} />
      )}
    </div>
  )
}
