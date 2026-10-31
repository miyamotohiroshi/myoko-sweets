import Image from 'next/image'
import Link from 'next/link'

type Props = {
  en: string
  ja: string
  className?: string
}

/** セクション見出し（Klee One の英字 + 日本語サブ） */
export default function SectionHeading({ en, ja, className = '' }: Props) {
  return (
    <div className={`flex items-end gap-3 md:gap-4 ${className}`}>
      <h2 className="font-klee font-semibold text-[36px] md:text-[44px] leading-none tracking-[0.5px] text-brand-brown-main">
        {en}
      </h2>
      <span className="pb-0.5 text-[13px] md:text-[14px] font-bold tracking-[0.32px] text-brand-brown-sub">
        {ja}
      </span>
    </div>
  )
}

/** 「ALL ⊕」リンク */
export function AllLink({ href, icon }: { href: string; icon: 'feature' | 'news' }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 text-brand-brown-sub">
      <span className="font-klee text-[18px] leading-[33px] tracking-[0.32px]">ALL</span>
      <Image
        src={`/images/top/icons/all-${icon}.svg`}
        alt=""
        width={22}
        height={22}
        className="transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  )
}
