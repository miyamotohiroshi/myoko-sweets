import Link from 'next/link'

// 1 … 4 5 6 … 10 のように前後だけ出す
function pageList(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set([1, total, current - 1, current, current + 1])
  const sorted = [...pages].filter(p => p >= 1 && p <= total).sort((a, b) => a - b)
  return sorted.flatMap((p, i) => (i > 0 && p - sorted[i - 1] > 1 ? ['…' as const, p] : [p]))
}

/** 記事一覧のページ送り（?page=2 のリンク） */
export default function ListPagination({ basePath, current, total }: { basePath: string; current: number; total: number }) {
  if (total <= 1) return null
  const href = (p: number) => (p === 1 ? basePath : `${basePath}?page=${p}`)
  const arrow = 'grid size-10 place-items-center rounded-full border border-brand-line bg-white transition-colors hover:bg-brand-ivory'

  return (
    <nav aria-label="ページ送り" className="mt-12 flex items-center justify-center gap-2">
      {current > 1 && <Link href={href(current - 1)} aria-label="前のページ" className={arrow}>‹</Link>}
      {pageList(current, total).map((p, i) =>
        p === '…' ? (
          <span key={`gap-${i}`} className="w-6 text-center text-brand-brown-sub">…</span>
        ) : (
          <Link
            key={p}
            href={href(p)}
            aria-current={p === current ? 'page' : undefined}
            className={`grid size-10 place-items-center rounded-full text-[14px] font-bold transition-colors ${p === current ? 'bg-brand-brown-main text-white' : 'hover:bg-brand-ivory'}`}
          >
            {p}
          </Link>
        ),
      )}
      {current < total && <Link href={href(current + 1)} aria-label="次のページ" className={arrow}>›</Link>}
    </nav>
  )
}
