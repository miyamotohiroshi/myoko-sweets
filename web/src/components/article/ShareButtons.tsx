import Image from 'next/image'
import { SITE_INFO } from '@/config/site'

/** 記事のシェアボタン（X・LINE）。お知らせ・特集の詳細で共用 */
export default function ShareButtons({ title, url }: { title: string; url: string }) {
  const text = encodeURIComponent(`${title} ${SITE_INFO.hashtag}`)
  const u = encodeURIComponent(url)
  const links = [
    { label: 'X でシェア',   icon: '/images/top/sns/icon-x.svg',    href: `https://x.com/intent/post?text=${text}&url=${u}` },
    { label: 'LINE で送る', icon: '/images/top/sns/icon-line.svg', href: `https://social-plugins.line.me/lineit/share?url=${u}` },
  ]
  return (
    <div className="flex items-center gap-3">
      <span className="font-klee font-semibold text-[14px] tracking-[1px] text-brand-brown-sub">Share</span>
      {links.map(link => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className="grid size-9 place-items-center rounded-full border border-brand-line bg-white transition-colors hover:bg-brand-ivory"
        >
          <Image src={link.icon} alt="" width={16} height={16} />
        </a>
      ))}
    </div>
  )
}
