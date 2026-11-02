import Link from 'next/link'

// TOP の中央タブ：見た目はタブだが、それぞれ独立したページへのリンク
const TABS = [
  { id: 'sweets', label: 'スイーツ',     sub: 'sweets', href: '/#shops' },
  { id: 'spots',  label: '観光スポット', sub: 'spot',   href: '/spots' },
  { id: 'plans',  label: 'モデルプラン', sub: 'plan',   href: null },  // リリース後に追加
] as const

export type CategoryTabId = (typeof TABS)[number]['id']

export default function CategoryTabs({ active }: { active: CategoryTabId }) {
  return (
    <nav aria-label="カテゴリ" className="flex">
      {TABS.map(tab => {
        const isActive = active === tab.id
        const className = [
          'relative flex-1 min-h-[58px] md:min-h-[70px] pt-2.5 md:pt-[11px] rounded-t-[14px] border-2 text-center transition-colors',
          isActive
            ? 'bg-white border-brand-beige border-b-transparent'
            : 'border-transparent border-b-brand-beige',
          tab.href && !isActive ? 'hover:bg-brand-ivory/60' : '',
        ].join(' ')

        const inner = (
          <>
            <span className={[
              'block font-bold text-[14px] md:text-[18px] leading-[31.45px] tracking-[0.32px]',
              isActive ? 'text-brand-brown-main' : tab.href ? 'text-brand-brown-sub' : 'text-brand-brown-sub/50',
            ].join(' ')}>
              {tab.label}
            </span>
            <span
              aria-hidden="true"
              className={[
                'block -rotate-4 -mt-2 font-klee font-semibold text-[12px] md:text-[17px] leading-[24px] md:leading-[31.45px] tracking-[0.68px] text-brand-green transition-opacity',
                isActive ? 'opacity-100' : 'opacity-0',
              ].join(' ')}
            >
              {tab.sub}
            </span>
            {!tab.href && (
              <span className="absolute inset-x-0 bottom-1.5 md:bottom-2 text-[10px] md:text-[11px] font-bold text-brand-brown-sub/60">近日公開</span>
            )}
          </>
        )

        if (!tab.href) {
          return <span key={tab.id} aria-disabled="true" className={className}>{inner}</span>
        }
        return (
          <Link key={tab.id} href={tab.href} aria-current={isActive ? 'page' : undefined} className={className}>
            {inner}
          </Link>
        )
      })}
    </nav>
  )
}
