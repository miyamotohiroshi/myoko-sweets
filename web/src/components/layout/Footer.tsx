import Link from 'next/link'
import Image from 'next/image'
import IconX from '@/components/icons/IconX'
import IconInstagram from '@/components/icons/IconInstagram'
import IconYoutube from '@/components/icons/IconYoutube'

const MENU_LINKS = [
  { href: '/', label: 'TOP' },
  { href: '/feature', label: '特集一覧' },
  { href: '/spots', label: '観光スポット' },
  { href: '/plans', label: '旅のモデルプラン' },
]

const ABOUT_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'プライバシーポリシー' },
  { href: '/sitemap', label: 'サイトマップ' },
]

const SNS_LINKS = [
  {
    href: 'https://x.com/myoko_sweets',
    label: 'X',
    icon: <IconX className="text-[#EAE2D2]" />,
  },
  {
    href: 'https://instagram.com/myoko_sweets',
    label: 'Instagram',
    icon: <IconInstagram className="text-[#EAE2D2]" />,
  },
  {
    href: 'https://youtube.com/@myoko_sweets',
    label: 'YouTube',
    icon: <IconYoutube className="text-[#EAE2D2]" />,
  },
]

function MountainLine() {
  return (
    <svg
      width="102"
      height="22"
      viewBox="0 0 102 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0.699219 20.7002L16.6992 0.700195L27.6992 13.7002L36.6992 2.7002L50.6992 20.7002L64.6992 4.7002L74.6992 16.7002L82.6992 7.7002L100.699 20.7002"
        stroke="white"
        strokeOpacity="0.3"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#5C4A2A' }}>
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-10 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="flex flex-col gap-6">
            <Link href="/" aria-label="myoko sweets TOP">
              <Image
                src="/logo/logo-footer.svg"
                alt="myoko sweets"
                width={160}
                height={40}
                className="h-9 w-auto"
              />
            </Link>

            <p
              className="text-sm leading-relaxed tracking-wide"
              style={{ color: '#EAE2D2' }}
            >
              妙高・野尻湖エリアスイーツ情報メディア
            </p>

            <div className="flex items-center gap-3">
              {SNS_LINKS.map((sns) => (
                <a
                  key={sns.label}
                  href={sns.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={sns.label}
                  className="w-10 h-10 rounded-full border flex items-center justify-center transition-opacity duration-200 hover:opacity-70"
                  style={{ borderColor: 'rgba(234,226,210,0.4)' }}
                >
                  {sns.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <p
              className="text-base font-medium tracking-wider"
              style={{ color: '#EAE2D2' }}
            >
              Menu
            </p>
            <nav className="flex flex-col gap-4" aria-label="Footer menu">
              {MENU_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-wide transition-opacity duration-200 hover:opacity-70"
                  style={{ color: '#EAE2D2' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-5">
            <p
              className="text-base font-medium tracking-wider"
              style={{ color: '#EAE2D2' }}
            >
              About
            </p>
            <nav className="flex flex-col gap-4" aria-label="Footer about">
              {ABOUT_LINKS.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm tracking-wide transition-opacity duration-200 hover:opacity-70"
                  style={{ color: '#EAE2D2' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div
        className="w-full max-w-[1440px] mx-auto px-4 md:px-10"
        style={{ borderTop: '0.5px solid rgba(234,226,210,0.2)' }}
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-10 py-6 flex items-start md:items-center justify-between flex-col md:flex-row gap-4">
        <p
          className="text-xs tracking-wider"
          style={{ color: '#EAE2D2', opacity: 0.6 }}
        >
          copyright © myoko sweets
        </p>
        <MountainLine />
      </div>
    </footer>
  )
}
