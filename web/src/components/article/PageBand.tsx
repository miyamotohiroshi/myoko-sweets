/** 記事ページ上部の見出し帯（例：News お知らせ）。一覧・詳細で共用 */
export default function PageBand({ en, ja, as: Tag = 'p' }: { en: string; ja: string; as?: 'h1' | 'p' }) {
  return (
    <div className="border-b border-brand-line bg-brand-store-bg">
      <Tag className="max-w-[1080px] mx-auto px-5 md:px-10 py-6 md:py-8 flex items-end gap-3">
        <span className="font-klee font-semibold text-[30px] md:text-[36px] leading-none tracking-[0.5px] [-webkit-text-stroke:0.6px_currentColor]">{en}</span>
        <span className="text-[13px] md:text-[14px] font-bold text-brand-brown-sub">{ja}</span>
      </Tag>
    </div>
  )
}
